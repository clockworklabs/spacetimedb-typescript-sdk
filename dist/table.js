"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = exports.TableUpdate = exports.TableOperation = void 0;
const events_1 = require("events");
const spacetimedb_1 = require("./spacetimedb");
const operations_map_1 = __importDefault(require("./operations_map"));
const algebraic_value_1 = require("./algebraic_value");
const binary_reader_1 = __importDefault(require("./binary_reader"));
class DBOp {
    type;
    instance;
    rowPk;
    constructor(type, rowPk, instance) {
        this.type = type;
        this.rowPk = rowPk;
        this.instance = instance;
    }
}
class TableOperation {
    /**
     * The type of CRUD operation.
     *
     * NOTE: An update is a `delete` followed by a 'insert' internally.
     */
    type;
    rowPk;
    row;
    constructor(type, rowPk, row) {
        this.type = type;
        this.rowPk = rowPk;
        this.row = row;
    }
}
exports.TableOperation = TableOperation;
class TableUpdate {
    tableName;
    operations;
    constructor(tableName, operations) {
        this.tableName = tableName;
        this.operations = operations;
    }
}
exports.TableUpdate = TableUpdate;
/**
 * Builder to generate calls to query a `table` in the database
 */
class Table {
    // TODO: most of this stuff should be probably private
    name;
    instances;
    emitter;
    entityClass;
    pkCol;
    /**
     * @param name the table name
     * @param pkCol column designated as `#[primarykey]`
     * @param entityClass the entityClass
     */
    constructor(name, pkCol, entityClass) {
        this.name = name;
        this.instances = new Map();
        this.emitter = new events_1.EventEmitter();
        this.pkCol = pkCol;
        this.entityClass = entityClass;
    }
    /**
     * @returns number of entries in the table
     */
    count() {
        return this.instances.size;
    }
    /**
     * @returns The values of the entries in the table
     */
    getInstances() {
        return Array.from(this.instances.values());
    }
    applyOperations = (protocol, operations, reducerEvent) => {
        let dbOps = [];
        for (let operation of operations) {
            const pk = operation.rowPk;
            const adapter = protocol === "binary"
                ? new algebraic_value_1.BinaryAdapter(new binary_reader_1.default(operation.row))
                : new algebraic_value_1.JSONAdapter(operation.row);
            const entry = spacetimedb_1.AlgebraicValue.deserialize(this.entityClass.getAlgebraicType(), adapter);
            const instance = this.entityClass.fromValue(entry);
            dbOps.push(new DBOp(operation.type, pk, instance));
        }
        if (this.entityClass.primaryKey !== undefined) {
            const pkName = this.entityClass.primaryKey;
            const inserts = [];
            const deleteMap = new operations_map_1.default();
            for (const dbOp of dbOps) {
                if (dbOp.type === "insert") {
                    inserts.push(dbOp);
                }
                else {
                    deleteMap.set(dbOp.instance[pkName], dbOp);
                }
            }
            for (const dbOp of inserts) {
                const deleteOp = deleteMap.get(dbOp.instance[pkName]);
                if (deleteOp) {
                    // the pk for updates will differ between insert/delete, so we have to
                    // use the instance from delete
                    this.update(dbOp, deleteOp, reducerEvent);
                    deleteMap.delete(dbOp.instance[pkName]);
                }
                else {
                    this.insert(dbOp, reducerEvent);
                }
            }
            for (const dbOp of deleteMap.values()) {
                this.delete(dbOp, reducerEvent);
            }
        }
        else {
            for (const dbOp of dbOps) {
                if (dbOp.type === "insert") {
                    this.insert(dbOp, reducerEvent);
                }
                else {
                    this.delete(dbOp, reducerEvent);
                }
            }
        }
    };
    update = (newDbOp, oldDbOp, reducerEvent) => {
        const newInstance = newDbOp.instance;
        const oldInstance = oldDbOp.instance;
        this.instances.delete(oldDbOp.rowPk);
        this.instances.set(newDbOp.rowPk, newInstance);
        this.emitter.emit("update", oldInstance, newInstance, reducerEvent);
    };
    insert = (dbOp, reducerEvent) => {
        this.instances.set(dbOp.rowPk, dbOp.instance);
        this.emitter.emit("insert", dbOp.instance, reducerEvent);
    };
    delete = (dbOp, reducerEvent) => {
        this.instances.delete(dbOp.rowPk);
        this.emitter.emit("delete", dbOp.instance, reducerEvent);
    };
    /**
     * Register a callback for when a row is newly inserted into the database.
     *
     * ```ts
     * User.onInsert((user, reducerEvent) => {
     *   if (reducerEvent) {
     *      console.log("New user on reducer", reducerEvent, user);
     *   } else {
     *      console.log("New user received during subscription update on insert", user);
     *  }
     * });
     * ```
     *
     * @param cb Callback to be called when a new row is inserted
     */
    onInsert = (cb) => {
        this.emitter.on("insert", cb);
    };
    /**
     * Register a callback for when a row is deleted from the database.
     *
     * ```ts
     * User.onDelete((user, reducerEvent) => {
     *   if (reducerEvent) {
     *      console.log("Deleted user on reducer", reducerEvent, user);
     *   } else {
     *      console.log("Deleted user received during subscription update on update", user);
     *  }
     * });
     * ```
     *
     * @param cb Callback to be called when a new row is inserted
     */
    onDelete = (cb) => {
        this.emitter.on("delete", cb);
    };
    /**
     * Register a callback for when a row is updated into the database.
     *
     * ```ts
     * User.onInsert((user, reducerEvent) => {
     *   if (reducerEvent) {
     *      console.log("Updated user on reducer", reducerEvent, user);
     *   } else {
     *      console.log("Updated user received during subscription update on delete", user);
     *  }
     * });
     * ```
     *
     * @param cb Callback to be called when a new row is inserted
     */
    onUpdate = (cb) => {
        this.emitter.on("update", cb);
    };
    /**
     * Removes the event listener for when a new row is inserted
     * @param cb Callback to be called when the event listener is removed
     */
    removeOnInsert = (cb) => {
        this.emitter.off("insert", cb);
    };
    /**
     * Removes the event listener for when a row is deleted
     * @param cb Callback to be called when the event listener is removed
     */
    removeOnDelete = (cb) => {
        this.emitter.off("delete", cb);
    };
    /**
     * Removes the event listener for when a row is updated
     * @param cb Callback to be called when the event listener is removed
     */
    removeOnUpdate = (cb) => {
        this.emitter.off("update", cb);
    };
}
exports.Table = Table;

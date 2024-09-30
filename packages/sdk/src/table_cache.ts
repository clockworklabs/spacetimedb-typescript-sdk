import { BinaryAdapter } from './algebraic_value.ts';
import BinaryReader from './binary_reader.ts';
import { EventEmitter } from './event_emitter.ts';
import OperationsMap from './operations_map.ts';
import type { ReducerEvent } from './reducer_event.ts';
import type { TableRuntimeTypeInfo } from './spacetime_module.ts';
import type { Event } from './event.ts';

import {
  type EventContext,
} from './db_connection.ts';

export type Operation = {
  type: 'insert' | 'delete';
  rowPk: string;
  row: any;
};

export type RawOperation = {
  type: 'insert' | 'delete';
  rowId: string;
  row: Uint8Array;
};

export type TableUpdate = {
  tableName: string;
  operations: RawOperation[];
};

/**
 * Builder to generate calls to query a `table` in the database
 */
export class TableCache<RowType = any> {
  private rows: Map<string, RowType>;
  private tableTypeInfo: TableRuntimeTypeInfo;
  private emitter: EventEmitter;

  /**
   * @param name the table name
   * @param primaryKeyCol column index designated as `#[primarykey]`
   * @param primaryKey column name designated as `#[primarykey]`
   * @param entityClass the entityClass
   */
  constructor(tableTypeInfo: TableRuntimeTypeInfo) {
    this.tableTypeInfo = tableTypeInfo;
    this.rows = new Map();
    this.emitter = new EventEmitter();
  }

  /**
   * @returns number of rows in the table
   */
  count(): number {
    return this.rows.size;
  }

  /**
   * @returns The values of the rows in the table
   */
  iter(): any[] {
    return Array.from(this.rows.values());
  }

  applyOperations = (
    rawOperations: RawOperation[],
    ctx: EventContext
  ): void => {
    let operations: Operation[] = [];
    for (let rawOperation of rawOperations) {
      const rowId: string = rawOperation.rowId;
      const reader = new BinaryReader(rawOperation.row);
      const row = this.tableTypeInfo.rowType.deserialize(reader);
      operations.push({ type: rawOperation.type, rowPk: rowId, row });
    }
        
    if (this.tableTypeInfo.primaryKey !== undefined) {
      const primaryKey = this.tableTypeInfo.primaryKey;
      const inserts: Operation[] = [];
      const deleteMap = new OperationsMap<any, Operation>();
      for (const op of operations) {
        if (op.type === 'insert') {
          inserts.push(op);
        } else {
          deleteMap.set(op.row[primaryKey], op);
        }
      }
      for (const insertOp of inserts) {
        const deleteOp = deleteMap.get(insertOp.row[primaryKey]);
        if (deleteOp) {
          // the pk for updates will differ between insert/delete, so we have to
          // use the row from delete
          this.update(ctx, insertOp, deleteOp);
          deleteMap.delete(insertOp.row[primaryKey]);
        } else {
          this.insert(ctx, insertOp);
        }
      }
      for (const deleteOp of deleteMap.values()) {
        this.delete(ctx, deleteOp);
      }
    } else {
      for (const op of operations) {
        if (op.type === 'insert') {
          this.insert(ctx, op);
        } else {
          this.delete(ctx, op);
        }
      }
    }
  };

  update = (
    ctx: EventContext,
    newDbOp: Operation,
    oldDbOp: Operation,
  ): void => {
    const newRow = newDbOp.row;
    const oldRow = oldDbOp.row;
    this.rows.delete(oldDbOp.rowPk);
    this.rows.set(newDbOp.rowPk, newRow);
    this.emitter.emit('update', ctx, oldRow, newRow,);
  };

  insert = (ctx: EventContext, operation: Operation): void => {
    this.rows.set(operation.rowPk, operation.row);
    this.emitter.emit('insert', ctx, operation.row);
  };

  delete = (ctx: EventContext, dbOp: Operation): void => {
    this.rows.delete(dbOp.rowPk);
    this.emitter.emit('delete', ctx, dbOp.row);
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
  onInsert = <EventContext>(
    cb: (
      ctx: EventContext,
      row: RowType,
    ) => void,
  ): void => {
    this.emitter.on('insert', cb);
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
  onDelete = <EventContext>(
    cb: (
      ctx: EventContext,
      row: RowType,
    ) => void,
  ): void => {
    this.emitter.on('delete', cb);
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
  onUpdate = <EventContext>(
    cb: (
      ctx: EventContext,
      oldRow: RowType,
      row: RowType,
    ) => void,
  ): void => {
    this.emitter.on('update', cb);
  };
}

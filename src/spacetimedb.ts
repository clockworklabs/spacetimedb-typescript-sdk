import { EventEmitter } from "events";

import WS from "websocket";
import type { WebsocketTestAdapter } from "./websocket_test_adapter";

import {
  ProductValue,
  AlgebraicValue,
  BinaryAdapter,
  JSONAdapter,
  ValueAdapter,
  ReducerArgsAdapter,
  JSONReducerArgsAdapter,
  BinaryReducerArgsAdapter,
} from "./algebraic_value";
import {
  AlgebraicType,
  ProductType,
  ProductTypeElement,
  SumType,
  SumTypeVariant,
  BuiltinType,
} from "./algebraic_type";
import { EventType } from "./types";
import {
  Message as ProtobufMessage,
  event_StatusToJSON,
  TableRowOperation_OperationType,
} from "./client_api";
import BinaryReader from "./binary_reader";

export {
  ProductValue,
  AlgebraicValue,
  AlgebraicType,
  ProductType,
  ProductTypeElement,
  SumType,
  SumTypeVariant,
  BuiltinType,
  ValueAdapter,
  ReducerArgsAdapter,
};

const g = (typeof window === "undefined" ? global : window)!;

type SpacetimeDBGlobals = {
  clientDB: ClientDB;
  spacetimeDBClient: SpacetimeDBClient | undefined;
  // TODO: it would be better to use a "family of classes" instead of any
  // in components and reducers, but I didn't have time to research
  // how to do it in TS
  reducers: Map<string, any>;
  components: Map<string, any>;

  registerReducer: (name: string, reducer: any) => void;
  registerComponent: (name: string, component: any) => void;
};

declare global {
  interface Window {
    __SPACETIMEDB__: SpacetimeDBGlobals;
  }
  var __SPACETIMEDB__: SpacetimeDBGlobals;
}

export class Reducer {}

export class IDatabaseTable {}

export class ReducerEvent {
  public callerIdentity: string;
  public reducerName: string;
  public status: string;
  public message: string;
  public args: any;

  constructor(
    callerIdentity: string,
    reducerName: string,
    status: string,
    message: string,
    args: any
  ) {
    this.callerIdentity = callerIdentity;
    this.reducerName = reducerName;
    this.status = status;
    this.message = message;
    this.args = args;
  }
}

class DBOp {
  public type: "insert" | "delete";
  public instance: any;
  public rowPk: string;

  constructor(type: "insert" | "delete", rowPk: string, instance: any) {
    this.type = type;
    this.rowPk = rowPk;
    this.instance = instance;
  }
}

class Table {
  // TODO: most of this stuff should be probably private
  public name: string;
  public instances: Map<string, IDatabaseTable>;
  public emitter: EventEmitter;
  private entityClass: any;
  pkCol?: number;

  constructor(name: string, pkCol: number | undefined, entityClass: any) {
    this.name = name;
    this.instances = new Map();
    this.emitter = new EventEmitter();
    this.pkCol = pkCol;
    this.entityClass = entityClass;
  }

  /**
   * @returns number of entries in the table
   */
  public count(): number {
    return this.instances.size;
  }

  /**
   * @returns The values of the entries in the table
   */
  public getInstances(): IterableIterator<any> {
    return this.instances.values();
  }

  applyOperations = (
    protocol: "binary" | "json",
    operations: TableOperation[],
    reducerEvent: ReducerEvent | undefined
  ) => {
    let dbOps: DBOp[] = [];
    for (let operation of operations) {
      const pk: string = operation.rowPk;
      const adapter =
        protocol === "binary"
          ? new BinaryAdapter(new BinaryReader(operation.row))
          : new JSONAdapter(operation.row);
      const entry = AlgebraicValue.deserialize(
        this.entityClass.getAlgebraicType(),
        adapter
      );
      const instance = this.entityClass.fromValue(entry);

      dbOps.push(new DBOp(operation.type, pk, instance));
    }

    if (this.entityClass.primaryKey !== undefined) {
      const pkName = this.entityClass.primaryKey;
      const inserts: any[] = [];
      const deleteMap = new Map();
      for (const dbOp of dbOps) {
        if (dbOp.type === "insert") {
          inserts.push(dbOp);
        } else {
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
        } else {
          this.insert(dbOp, reducerEvent);
        }
      }
      for (const dbOp of deleteMap.values()) {
        this.delete(dbOp, reducerEvent);
      }
    } else {
      for (const dbOp of dbOps) {
        if (dbOp.type === "insert") {
          this.insert(dbOp, reducerEvent);
        } else {
          this.delete(dbOp, reducerEvent);
        }
      }
    }
  };

  update = (
    newDbOp: DBOp,
    oldDbOp: DBOp,
    reducerEvent: ReducerEvent | undefined
  ) => {
    const newInstance = newDbOp.instance;
    const oldInstance = oldDbOp.instance;
    this.instances.delete(oldDbOp.rowPk);
    this.instances.set(newDbOp.rowPk, newInstance);
    this.emitter.emit("update", oldInstance, newInstance, reducerEvent);
  };

  insert = (dbOp: DBOp, reducerEvent: ReducerEvent | undefined) => {
    this.instances.set(dbOp.rowPk, dbOp.instance);
    this.emitter.emit("insert", dbOp.instance, reducerEvent);
  };

  delete = (dbOp: DBOp, reducerEvent: ReducerEvent | undefined) => {
    this.instances.delete(dbOp.rowPk);
    this.emitter.emit("delete", dbOp.instance, reducerEvent);
  };

  /**
   * Called when a new row is inserted
   * @param cb Callback to be called when a new row is inserted
   */
  onInsert = (
    cb: (value: any, reducerEvent: ReducerEvent | undefined) => void
  ) => {
    this.emitter.on("insert", cb);
  };

  /**
   * Called when a row is deleted
   * @param cb Callback to be called when a row is deleted
   */
  onDelete = (
    cb: (value: any, reducerEvent: ReducerEvent | undefined) => void
  ) => {
    this.emitter.on("delete", cb);
  };

  /**
   * Called when a row is updated
   * @param cb Callback to be called when a row is updated
   */
  onUpdate = (
    cb: (
      value: any,
      oldValue: any,
      reducerEvent: ReducerEvent | undefined
    ) => void
  ) => {
    this.emitter.on("update", cb);
  };

  /**
   * Removes the event listener for when a new row is inserted
   * @param cb Callback to be called when the event listener is removed
   */
  removeOnInsert = (
    cb: (value: any, reducerEvent: ReducerEvent | undefined) => void
  ) => {
    this.emitter.off("insert", cb);
  };

  /**
   * Removes the event listener for when a row is deleted
   * @param cb Callback to be called when the event listener is removed
   */
  removeOnDelete = (
    cb: (value: any, reducerEvent: ReducerEvent | undefined) => void
  ) => {
    this.emitter.off("delete", cb);
  };

  /**
   * Removes the event listener for when a row is updated
   * @param cb Callback to be called when the event listener is removed
   */
  removeOnUpdate = (
    cb: (
      value: any,
      oldValue: any,
      reducerEvent: ReducerEvent | undefined
    ) => void
  ) => {
    this.emitter.off("update", cb);
  };
}

export class ClientDB {
  /**
   * The tables in the database.
   */
  tables: Map<string, Table>;

  constructor() {
    this.tables = new Map();
  }

  /**
   * Returns the table with the given name.
   * @param name The name of the table.
   * @returns The table
   */
  getTable(name: string): Table {
    const table = this.tables.get(name);

    // ! This should not happen as the table should be available but an exception is thrown just in case.
    if (!table) {
      throw new Error(`Table ${name} does not exist`);
    }

    return table;
  }

  getOrCreateTable = (
    tableName: string,
    pkCol: number | undefined,
    entityClass: any
  ) => {
    let table;
    if (!this.tables.has(tableName)) {
      table = new Table(tableName, pkCol, entityClass);
      this.tables.set(tableName, table);
    } else {
      table = this.tables.get(tableName)!;
    }
    return table;
  };
}

class TableOperation {
  public type: "insert" | "delete";
  public rowPk: string;
  public row: Uint8Array | any;

  constructor(type: "insert" | "delete", rowPk: string, row: Uint8Array | any) {
    this.type = type;
    this.rowPk = rowPk;
    this.row = row;
  }
}

class TableUpdate {
  public tableName: string;
  public operations: TableOperation[];

  constructor(tableName: string, operations: TableOperation[]) {
    this.tableName = tableName;
    this.operations = operations;
  }
}

class SubscriptionUpdateMessage {
  public tableUpdates: TableUpdate[];

  constructor(tableUpdates: TableUpdate[]) {
    this.tableUpdates = tableUpdates;
  }
}

class TransactionUpdateEvent {
  public identity: string;
  public originalReducerName: string;
  public reducerName: string;
  public args: any[] | Uint8Array;
  public status: string;
  public message: string;

  constructor(
    identity: string,
    originalReducerName: string,
    reducerName: string,
    args: any[] | Uint8Array,
    status: string,
    message: string
  ) {
    this.identity = identity;
    this.originalReducerName = originalReducerName;
    this.reducerName = reducerName;
    this.args = args;
    this.status = status;
    this.message = message;
  }
}

class TransactionUpdateMessage {
  public tableUpdates: TableUpdate[];
  public event: TransactionUpdateEvent;

  constructor(tableUpdates: TableUpdate[], event: TransactionUpdateEvent) {
    this.tableUpdates = tableUpdates;
    this.event = event;
  }
}

class IdentityTokenMessage {
  public identity: Uint8Array;
  public token: string;

  constructor(identity: Uint8Array, token: string) {
    this.identity = identity;
    this.token = token;
  }
}
type Message =
  | SubscriptionUpdateMessage
  | TransactionUpdateMessage
  | IdentityTokenMessage;

type CreateWSFnType = (
  url: string,
  headers: { [key: string]: string },
  protocol: string
) => WS.w3cwebsocket | WebsocketTestAdapter;

let toPascalCase = function (s: string): string {
  const str = s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export class SpacetimeDBClient {
  /**
   * The identity of the user.
   */
  identity?: Uint8Array = undefined;
  /**
   * The token of the user.
   */
  token?: string = undefined;
  /**
   * Reference to the database of the client.
   */
  public db: ClientDB;
  public emitter!: EventEmitter;

  /**
   * Whether the client is connected via websocket.
   */
  public live: boolean;

  private ws!: WS.w3cwebsocket | WebsocketTestAdapter;
  private reducers: Map<string, any>;
  private components: Map<string, any>;
  private queriesQueue: string[];
  private runtime: {
    host: string;
    name_or_address: string;
    auth_token?: string;
    global: SpacetimeDBGlobals;
  };
  private createWSFn: CreateWSFnType;
  private protocol: "binary" | "json";

  constructor(
    host: string,
    name_or_address: string,
    auth_token?: string,
    protocol?: "binary" | "json"
  ) {
    this.protocol = protocol || "binary";
    const global = g.__SPACETIMEDB__;
    this.db = global.clientDB;
    // I don't really like it, but it seems like the only way to
    // make reducers work like they do in C#
    global.spacetimeDBClient = this;
    // register any reducers added before creating a client
    this.reducers = new Map();
    for (const [name, reducer] of global.reducers) {
      this.reducers.set(name, reducer);
    }
    this.components = new Map();
    for (const [name, component] of global.components) {
      this.registerComponent(name, component);
    }
    this.live = false;
    this.emitter = new EventEmitter();
    this.queriesQueue = [];

    this.runtime = {
      host,
      name_or_address,
      auth_token,
      global,
    };

    this.createWSFn = (
      url: string,
      headers: { [key: string]: string },
      protocol: string
    ) => {
      return new WS.w3cwebsocket(url, protocol, undefined, headers, undefined, {
        maxReceivedFrameSize: 100000000,
        maxReceivedMessageSize: 100000000,
      });
    };
  }

  /**
   * Disconnect from The SpacetimeDB Websocket For Your Module.
   */
  public disconnect() {
    this.ws.close();
  }

  /**
   * Connect to The SpacetimeDB Websocket For Your Module. By default, this will use a secure websocket connection. The parameters are optional, and if not provided, will use the values provided on construction of the client.
   * @param host The host of the spacetimeDB server
   * @param name_or_address The name or address of the spacetimeDB module
   * @param credentials The credentials to use to connect to the spacetimeDB module
   */
  public connect(host?: string, name_or_address?: string, auth_token?: string) {
    if (this.live) {
      return;
    }

    console.info("Connecting to SpacetimeDB WS...");

    if (host) {
      this.runtime.host = host;
    }

    if (name_or_address) {
      this.runtime.name_or_address = name_or_address;
    }

    if (auth_token) {
      this.runtime.auth_token = auth_token;
    }

    let headers: { [key: string]: string } = {};
    if (this.runtime.auth_token) {
      this.token = this.runtime.auth_token;
      headers["Authorization"] = `Basic ${btoa("token:" + this.token)}`;
    }
    let url = `${this.runtime.host}/database/subscribe/${this.runtime.name_or_address}`;
    if (
      !this.runtime.host.startsWith("ws://") &&
      !this.runtime.host.startsWith("wss://")
    ) {
      url = "ws://" + url;
    }

    const stdbProtocol = this.protocol === "binary" ? "bin" : "text";
    this.ws = this.createWSFn(url, headers, `v1.${stdbProtocol}.spacetimedb`);

    // Create a timeout for the connection to be established
    var connectionTimeout = setTimeout(() => {
      this.ws.close();
      console.error("Connect failed: timeout");
      this.emitter.emit("disconnected");
      this.emitter.emit("client_error", event);
    }, 5000); // 5000 ms = 5 seconds

    this.ws.onclose = (event) => {
      console.error("Closed: ", event);
      this.emitter.emit("disconnected");
      this.emitter.emit("client_error", event);
    };

    this.ws.onerror = (event) => {
      console.error("Error: ", event);
      this.emitter.emit("disconnected");
      this.emitter.emit("client_error", event);
    };

    this.ws.onopen = () => {
      clearTimeout(connectionTimeout);

      this.live = true;

      if (this.queriesQueue.length > 0) {
        this.subscribe(this.queriesQueue);
        this.queriesQueue = [];
      }
    };

    this.ws.onmessage = (wsMessage: any) => {
      this.processMessage(wsMessage, (message: Message) => {
        if (message instanceof SubscriptionUpdateMessage) {
          for (let tableUpdate of message.tableUpdates) {
            const tableName = tableUpdate.tableName;
            const entityClass = this.runtime.global.components.get(tableName);
            const table = this.db.getOrCreateTable(
              tableUpdate.tableName,
              undefined,
              entityClass
            );

            table.applyOperations(this.protocol, tableUpdate.operations);
          }

          if (this.emitter) {
            this.emitter.emit("initialStateSync");
          }
        } else if (message instanceof TransactionUpdateMessage) {
          const reducerName = message.event.reducerName;
          const reducer: any | undefined = reducerName
            ? this.reducers.get(reducerName)
            : undefined;

          let reducerEvent: ReducerEvent | undefined;
          let reducerArgs: any;
          if (reducer) {
            let adapter: ReducerArgsAdapter;
            if (this.protocol === "binary") {
              adapter = new BinaryReducerArgsAdapter(
                new BinaryAdapter(
                  new BinaryReader(message.event.args as Uint8Array)
                )
              );
            } else {
              adapter = new JSONReducerArgsAdapter(message.event.args as any[]);
            }

            reducerArgs = reducer.deserializeArgs(adapter);
            reducerEvent = new ReducerEvent(
              message.event.identity,
              message.event.originalReducerName,
              message.event.status,
              message.event.message,
              reducerArgs
            );
          }

          for (let tableUpdate of message.tableUpdates) {
            const tableName = tableUpdate.tableName;
            const entityClass = this.runtime.global.components.get(tableName);
            const table = this.db.getOrCreateTable(
              tableUpdate.tableName,
              undefined,
              entityClass
            );

            table.applyOperations(
              this.protocol,
              tableUpdate.operations,
              reducerEvent
            );
          }

          if (reducer) {
            this.emitter.emit(
              "reducer:" + reducerName,
              message.event.status,
              message.event.identity,
              reducerArgs
            );
          }
        } else if (message instanceof IdentityTokenMessage) {
          this.identity = message.identity;
          this.token = message.token;
          this.emitter.emit("connected", this.token, this.identity);
        }
      });
    };
  }

  private processMessage(wsMessage: any, callback: (message: Message) => void) {
    if (this.protocol === "binary") {
      wsMessage.data.arrayBuffer().then((data: any) => {
        const message: ProtobufMessage = ProtobufMessage.decode(
          new Uint8Array(data)
        );
        if (message["subscriptionUpdate"]) {
          let subUpdate = message["subscriptionUpdate"] as any;
          const tableUpdates: TableUpdate[] = [];
          for (const rawTableUpdate of subUpdate["tableUpdates"]) {
            const tableName = rawTableUpdate["tableName"];
            const operations: TableOperation[] = [];
            for (const rawTableOperation of rawTableUpdate[
              "tableRowOperations"
            ]) {
              const type =
                rawTableOperation["op"] ===
                TableRowOperation_OperationType.INSERT
                  ? "insert"
                  : "delete";
              const rowPk = new TextDecoder().decode(
                rawTableOperation["rowPk"]
              );
              operations.push(
                new TableOperation(type, rowPk, rawTableOperation.row)
              );
            }
            const tableUpdate = new TableUpdate(tableName, operations);
            tableUpdates.push(tableUpdate);
          }

          const subscriptionUpdate = new SubscriptionUpdateMessage(
            tableUpdates
          );
          callback(subscriptionUpdate);
        } else if (message["transactionUpdate"]) {
          let txUpdate = (message["transactionUpdate"] as any)[
            "subscriptionUpdate"
          ];
          const tableUpdates: TableUpdate[] = [];
          for (const rawTableUpdate of txUpdate["tableUpdates"]) {
            const tableName = rawTableUpdate["tableName"];
            const operations: TableOperation[] = [];
            for (const rawTableOperation of rawTableUpdate[
              "tableRowOperations"
            ]) {
              const type =
                rawTableOperation["op"] ===
                TableRowOperation_OperationType.INSERT
                  ? "insert"
                  : "delete";
              const rowPk = new TextDecoder().decode(
                rawTableOperation["rowPk"]
              );
              operations.push(
                new TableOperation(type, rowPk, rawTableOperation.row)
              );
            }
            const tableUpdate = new TableUpdate(tableName, operations);
            tableUpdates.push(tableUpdate);
          }

          const event = message["transactionUpdate"]["event"] as any;
          const functionCall = event["functionCall"] as any;
          const identity: string = event["callerIdentity"];
          const originalReducerName: string = functionCall["reducer"];
          const reducerName: string = toPascalCase(originalReducerName);
          const args = functionCall["argBytes"];
          const status: string = event_StatusToJSON(event["status"]);
          const messageStr = event["message"];

          const transactionUpdateEvent: TransactionUpdateEvent =
            new TransactionUpdateEvent(
              identity,
              originalReducerName,
              reducerName,
              args,
              status,
              messageStr
            );

          const transactionUpdate = new TransactionUpdateMessage(
            tableUpdates,
            transactionUpdateEvent
          );
          callback(transactionUpdate);
        } else if (message["identityToken"]) {
          const identityToken = message["identityToken"] as any;
          const identity = identityToken["identity"];
          const token = identityToken["token"];
          const identityTokenMessage: IdentityTokenMessage =
            new IdentityTokenMessage(identity, token);
          callback(identityTokenMessage);
        }
      });
    } else {
      const data = JSON.parse(wsMessage.data);
      if (data["SubscriptionUpdate"]) {
        let subUpdate = data["SubscriptionUpdate"];
        const tableUpdates: TableUpdate[] = [];
        for (const rawTableUpdate of subUpdate["table_updates"]) {
          const tableName = rawTableUpdate["table_name"];
          const operations: TableOperation[] = [];
          for (const rawTableOperation of rawTableUpdate[
            "table_row_operations"
          ]) {
            const type = rawTableOperation["op"];
            const rowPk = rawTableOperation["rowPk"];
            operations.push(
              new TableOperation(type, rowPk, rawTableOperation.row)
            );
          }
          const tableUpdate = new TableUpdate(tableName, operations);
          tableUpdates.push(tableUpdate);
        }

        const subscriptionUpdate = new SubscriptionUpdateMessage(tableUpdates);
        callback(subscriptionUpdate);
      } else if (data["TransactionUpdate"]) {
        const txUpdate = data["TransactionUpdate"];
        const tableUpdates: TableUpdate[] = [];
        for (const rawTableUpdate of txUpdate["subscription_update"][
          "table_updates"
        ]) {
          const tableName = rawTableUpdate["table_name"];
          const operations: TableOperation[] = [];
          for (const rawTableOperation of rawTableUpdate[
            "table_row_operations"
          ]) {
            const type = rawTableOperation["op"];
            const rowPk = rawTableOperation["rowPk"];
            operations.push(
              new TableOperation(type, rowPk, rawTableOperation.row)
            );
          }
          const tableUpdate = new TableUpdate(tableName, operations);
          tableUpdates.push(tableUpdate);
        }

        const event = txUpdate["event"] as any;
        const functionCall = event["function_call"] as any;
        const identity: string = event["caller_identity"];
        const originalReducerName: string = functionCall["reducer"];
        const reducerName: string = toPascalCase(originalReducerName);
        const args = JSON.parse(functionCall["args"]);
        const status: string = event["status"];
        const message = event["message"];

        const transactionUpdateEvent: TransactionUpdateEvent =
          new TransactionUpdateEvent(
            identity,
            originalReducerName,
            reducerName,
            args,
            status,
            message
          );

        const transactionUpdate = new TransactionUpdateMessage(
          tableUpdates,
          transactionUpdateEvent
        );
        callback(transactionUpdate);
      } else if (data["IdentityToken"]) {
        const identityToken = data["IdentityToken"];
        const identity = identityToken["identity"];
        const token = identityToken["token"];
        const identityTokenMessage: IdentityTokenMessage =
          new IdentityTokenMessage(identity, token);
        callback(identityTokenMessage);
      }
    }
  }

  /**
   * Register a reducer to be used with your SpacetimeDB module
   * @param name The name of the reducer to register
   * @param reducer The reducer to register
   */
  public registerReducer(name: string, reducer: any) {
    this.reducers.set(name, reducer);
  }

  /**
   * Register a component to be used with your SpacetimeDB module. If the websocket is already connected it will add it to the list of subscribed components
   * @param name The name of the component to register
   * @param component The component to register
   */
  public registerComponent(name: string, component: any) {
    this.components.set(name, component);
    this.db.getOrCreateTable(name, undefined, component);
  }

  /**
   * @deprecated
   * Adds a component to the list of components to subscribe to in your websocket connection
   * @param element The component to subscribe to
   */
  public subscribeComponent(element: any) {
    if (element.tableName) {
      this.ws.send(
        JSON.stringify({ subscribe: { query_strings: [element.tableName] } })
      );
    }
  }

  /**
   * Subscribes to a query or multiple queries
   * @param queries Can be either a string for one query or an array for multiple queries
   */
  public subscribe(queryOrQueries: string | string[]) {
    const queries =
      typeof queryOrQueries === "string" ? [queryOrQueries] : queryOrQueries;

    if (this.live) {
      this.ws.send(JSON.stringify({ subscribe: { query_strings: queries } }));
    } else {
      this.queriesQueue = this.queriesQueue.concat(queries);
    }
  }

  /**
   * Call a reducer on your SpacetimeDB module
   * @param reducerName The name of the reducer to call
   * @param args The arguments to pass to the reducer
   */
  public call(reducerName: String, args: Array<any>) {
    const msg = `{
    "call": {
      "fn": "${reducerName}",
      "args": ${JSON.stringify(args)}
    }
}`;
    this.ws.send(msg);
  }

  on(eventName: EventType | string, callback: (...args: any[]) => void) {
    this.emitter.on(eventName, callback);
  }

  off(eventName: EventType | string, callback: (...args: any[]) => void) {
    this.emitter.off(eventName, callback);
  }

  onConnect(callback: (token: string, identity: Uint8Array) => void) {
    this.on("connected", callback);
  }

  onError(callback: (...args: any[]) => void) {
    this.on("client_error", callback);
  }

  _setCreateWSFn(fn: CreateWSFnType) {
    this.createWSFn = fn;
  }
}

g.__SPACETIMEDB__ = {
  components: new Map(),
  clientDB: new ClientDB(),
  reducers: new Map(),

  registerReducer: function (name: string, reducer: any) {
    let global = g.__SPACETIMEDB__;
    global.reducers.set(name, reducer);

    if (global.spacetimeDBClient) {
      global.spacetimeDBClient.registerReducer(name, reducer);
    }
  },

  registerComponent: function (name: string, component: any) {
    let global = g.__SPACETIMEDB__;
    global.components.set(name, component);

    if (global.spacetimeDBClient) {
      global.spacetimeDBClient.registerComponent(name, component);
    }
  },
  spacetimeDBClient: undefined,
};

export const __SPACETIMEDB__ = (
  typeof window === "undefined"
    ? global.__SPACETIMEDB__
    : window.__SPACETIMEDB__
)!;

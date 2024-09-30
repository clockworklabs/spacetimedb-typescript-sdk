import { Address } from './address.ts';
import {
  AlgebraicType,
  ProductType,
  ProductTypeElement,
  SumType,
  SumTypeVariant,
} from './algebraic_type.ts';
import {
  AlgebraicValue,
  parseValue,
  ProductValue,
  type ReducerArgsAdapter,
  type ValueAdapter,
} from './algebraic_value.ts';
import BinaryReader from './binary_reader.ts';
import BinaryWriter from './binary_writer.ts';
import * as ws from './client_api.ts';
import { ClientCache } from './client_cache.ts';
import { DbContext } from './db_context.ts';
import { EventEmitter } from './event_emitter.ts';
import type { Identity } from './identity.ts';
import { stdbLogger } from './logger.ts';
import {
  IdentityTokenMessage,
  SubscriptionUpdateMessage,
  TransactionUpdateEvent,
  TransactionUpdateMessage,
  type Message,
} from './message_types.ts';
import { Reducer } from './reducer.ts';
import { ReducerEvent } from './reducer_event.ts';
import type SpacetimeModule from './spacetime_module.ts';
import { TableCache, type RawOperation, type TableUpdate } from './table_cache.ts';
import type { CallbackInit, EventType } from './types.ts';
import { toPascalCase } from './utils.ts';
import { WebsocketDecompressAdapter } from './websocket_decompress_adapter.ts';
import type { WebsocketTestAdapter } from './websocket_test_adapter.ts';

export {
  AlgebraicType,
  AlgebraicValue,
  DbContext,
  ProductType,
  ProductTypeElement,
  ProductValue,
  Reducer,
  ReducerEvent,
  SumType,
  SumTypeVariant,
  type CallbackInit,
  type ReducerArgsAdapter,
  type ValueAdapter,
  BinaryReader,
  BinaryWriter,
  TableCache
};

export class DBConnection {
  isActive = false;
  /**
   * The user's public identity.
   */
  identity?: Identity = undefined;
  /**
   * The user's private authentication token.
   */
  token?: string = undefined;

  /**
   * Reference to the database of the client.
   */
  clientCache: ClientCache;
  remoteModule: SpacetimeModule;
  #emitter: EventEmitter = new EventEmitter();

  queriesQueue: string[] = [];

  wsPromise!: Promise<WebsocketDecompressAdapter | WebsocketTestAdapter>;
  ws?: WebsocketDecompressAdapter | WebsocketTestAdapter;
  createWSFn: typeof WebsocketDecompressAdapter.createWebSocketFn;

  runtime!: {
    uri: URL;
    nameOrAddress: string;
    authToken?: string;
  };
  clientAddress: Address = Address.random();

  constructor(remoteModule: SpacetimeModule) {
    this.clientCache = new ClientCache();
    this.remoteModule = remoteModule;
    this.createWSFn = WebsocketDecompressAdapter.createWebSocketFn;
  }

  /**
   * Close the current connection.
   *
   * @example
   *
   * ```ts
   * var spacetimeDBClient = new SpacetimeDBClient("ws://localhost:3000", "database_name");
   *
   * spacetimeDBClient.disconnect()
   * ```
   */
  disconnect(): void {
    this.wsPromise.then(wsResolved => {
      wsResolved.close();
    });
  }

  #processParsedMessage(
    message: ws.ServerMessage,
    callback: (message: Message) => void
  ) {
    // Helpers for parsing message components which appear in multiple messages.
    const parseTableOperation = (
      rawRow: ws.EncodedValue,
      type: 'insert' | 'delete'
    ): RawOperation => {
      // Our SDKs are architected around having a hashable, equality-comparable key
      // which uniquely identifies every row.
      // This used to be a strong content-addressed hash computed by the DB,
      // but the DB no longer computes those hashes,
      // so now we just use the serialized row as the identifier.
      // That's the second argument to the `TableRowOperation` constructor.

      switch (rawRow.tag) {
        case 'Binary':
          return {
            type,
            rowId: new TextDecoder().decode(rawRow.value),
            row: rawRow.value,
          };
        case 'Text':
          return {
            type,
            rowId: rawRow.value,
            row: new TextEncoder().encode(rawRow.value),
          };
      }
    };
    const parseTableUpdate = (rawTableUpdate: ws.TableUpdate): TableUpdate => {
      const tableName = rawTableUpdate.tableName;
      const operations: RawOperation[] = [];
      for (const insert of rawTableUpdate.inserts) {
        operations.push(parseTableOperation(insert, 'insert'));
      }
      for (const del of rawTableUpdate.deletes) {
        operations.push(parseTableOperation(del, 'delete'));
      }
      return {
        tableName,
        operations,
      };
    };
    const parseDatabaseUpdate = (
      dbUpdate: ws.DatabaseUpdate
    ): SubscriptionUpdateMessage => {
      const tableUpdates: TableUpdate[] = [];
      for (const rawTableUpdate of dbUpdate.tables) {
        tableUpdates.push(parseTableUpdate(rawTableUpdate));
      }
      return new SubscriptionUpdateMessage(tableUpdates);
    };

    switch (message.tag) {
      case 'InitialSubscription': {
        const dbUpdate = message.value.databaseUpdate;
        const subscriptionUpdate = parseDatabaseUpdate(dbUpdate);
        callback(subscriptionUpdate);
        break;
      }

      case 'TransactionUpdate': {
        const txUpdate = message.value;
        const identity = txUpdate.callerIdentity;
        const address = Address.nullIfZero(txUpdate.callerAddress);
        const originalReducerName = txUpdate.reducerCall.reducerName;
        const reducerName: string = toPascalCase(originalReducerName);
        const rawArgs = txUpdate.reducerCall.args;
        const energyQuantaUsed = txUpdate.energyQuantaUsed;

        if (rawArgs.tag !== 'Binary') {
          throw new Error(
            `Expected a binary EncodedValue but found ${rawArgs.tag} ${rawArgs.value}`
          );
        }
        const args = rawArgs.value;
        let subscriptionUpdate: SubscriptionUpdateMessage;
        let errMessage = '';
        switch (txUpdate.status.tag) {
          case 'Committed':
            subscriptionUpdate = parseDatabaseUpdate(txUpdate.status.value);
            break;
          case 'Failed':
            subscriptionUpdate = new SubscriptionUpdateMessage([]);
            errMessage = txUpdate.status.value;
            break;
          case 'OutOfEnergy':
            subscriptionUpdate = new SubscriptionUpdateMessage([]);
            break;
        }
        const transactionUpdateEvent: TransactionUpdateEvent =
          new TransactionUpdateEvent({
            identity,
            address,
            originalReducerName,
            reducerName,
            args,
            status: txUpdate.status,
            energyConsumed: energyQuantaUsed.quanta,
            message: errMessage,
            timestamp: txUpdate.timestamp,
          });

        const transactionUpdate = new TransactionUpdateMessage(
          subscriptionUpdate.tableUpdates,
          transactionUpdateEvent
        );
        callback(transactionUpdate);
        break;
      }

      case 'IdentityToken': {
        const identityTokenMessage: IdentityTokenMessage =
          new IdentityTokenMessage(
            message.value.identity,
            message.value.token,
            message.value.address
          );
        callback(identityTokenMessage);
        break;
      }

      case 'OneOffQueryResponse': {
        throw new Error(
          `TypeScript SDK never sends one-off queries, but got OneOffQueryResponse ${message}`
        );
      }
    }
  }

  processMessage(data: Uint8Array, callback: (message: Message) => void): void {
    const message = parseValue(ws.ServerMessage, data);
    this.#processParsedMessage(message, callback);
  }

  /**
   * Subscribe to a set of queries, to be notified when rows which match those queries are altered.
   *
   * NOTE: A new call to `subscribe` will remove all previous subscriptions and replace them with the new `queries`.
   *
   * If any rows matched the previous subscribed queries but do not match the new queries,
   * those rows will be removed from the client cache, and `{Table}.on_delete` callbacks will be invoked for them.
   *
   * @param queries A `SQL` query or list of queries.
   *
   * @example
   *
   * ```ts
   * spacetimeDBClient.subscribe(["SELECT * FROM User","SELECT * FROM Message"]);
   * ```
   */
  subscribe(queryOrQueries: string | string[]): void {
    const queries =
      typeof queryOrQueries === 'string' ? [queryOrQueries] : queryOrQueries;
    if (this.isActive) {
      const message = ws.ClientMessage.Subscribe(
        new ws.Subscribe(
          queries,
          // The TypeScript SDK doesn't currently track `request_id`s,
          // so always use 0.
          0
        )
      );
      this.#sendMessage(message);
    } else {
      this.queriesQueue = this.queriesQueue.concat(queries);
    }
  }

  #sendMessage(message: ws.ClientMessage) {
    this.wsPromise.then(wsResolved => {
      const writer = new BinaryWriter(1024);
      ws.ClientMessage.getAlgebraicType().serialize(writer, message);
      const encoded = writer.getBuffer();
      this.#emitter.emit('sendWSMessage', encoded);
      wsResolved.send(encoded);
    });
  }

  /**
   * Call a reducer on your SpacetimeDB module.
   *
   * @param reducerName The name of the reducer to call
   * @param argsSerializer The arguments to pass to the reducer
   */
  callReducer(reducerName: string, argsBuffer: Uint8Array): void {
    const message = ws.ClientMessage.CallReducer(
      new ws.CallReducer(
        reducerName,
        ws.EncodedValue.Binary(argsBuffer),
        // The TypeScript SDK doesn't currently track `request_id`s,
        // so always use 0.
        0
      )
    );
    this.#sendMessage(message);
  }

  /**
   * Handles WebSocket onClose event.
   * @param event CloseEvent object.
   */
  handleOnClose(event: CloseEvent): void {
    stdbLogger('warn', 'Closed: ' + event);
    this.#emitter.emit('disconnected');
    this.#emitter.emit('client_error', event);
  }

  /**
   * Handles WebSocket onError event.
   * @param event ErrorEvent object.
   */
  handleOnError(event: ErrorEvent): void {
    stdbLogger('warn', 'WS Error: ' + event);
    this.#emitter.emit('disconnected');
    this.#emitter.emit('client_error', event);
  }

  /**
   * Handles WebSocket onOpen event.
   */
  handleOnOpen(): void {
    this.isActive = true;

    if (this.queriesQueue.length > 0) {
      this.subscribe(this.queriesQueue);
      this.queriesQueue = [];
    }
  }

  /**
   * Handles WebSocket onMessage event.
   * @param wsMessage MessageEvent object.
   */
  handleOnMessage(wsMessage: { data: Uint8Array }): void {
    this.#emitter.emit('receiveWSMessage', wsMessage);

    this.processMessage(wsMessage.data, message => {
      if (message instanceof SubscriptionUpdateMessage) {
        for (let tableUpdate of message.tableUpdates) {
          // Get table information for the table being updated
          const tableName = tableUpdate.tableName;
          const tableTypeInfo = this.remoteModule.tables[tableName]!;
          const table = this.clientCache.getOrCreateTable(
            tableTypeInfo
          );
          table.applyOperations(tableUpdate.operations, undefined);
        }

        if (this.#emitter) {
          this.#emitter.emit('initialStateSync');
        }
      } else if (message instanceof TransactionUpdateMessage) {
        const reducerName = message.event.reducerName;
        const reducerTypeInfo = this.remoteModule.reducers[reducerName]!;

        if (reducerName == '<none>') {
          let errorMessage = message.event.message;
          console.error(`Received an error from the database: ${errorMessage}`);
        } else {
          let reducerEvent: ReducerEvent | undefined;
          let reducerArgs: any;
          if (message.event.status.tag === 'Committed') {
            const reader = new BinaryReader(message.event.args as Uint8Array)
            reducerArgs = reducerTypeInfo.reducerArgsType.deserialize(reader);
          }

          reducerEvent = new ReducerEvent({
            callerIdentity: message.event.identity,
            status: message.event.status,
            message: message.event.message,
            callerAddress: message.event.address as Address,
            timestamp: message.event.timestamp,
            energyConsumed: message.event.energyConsumed,
          });

          for (let tableUpdate of message.tableUpdates) {
            // Get table information for the table being updated
            const tableName = tableUpdate.tableName;
            const tableTypeInfo = this.remoteModule.tables[tableName]!;
            const table = this.clientCache.getOrCreateTable(
              tableTypeInfo
            );
            table.applyOperations(tableUpdate.operations, reducerEvent);
          }

          this.#emitter.emit(
            'reducer:' + reducerName,
            reducerEvent,
            ...(reducerArgs || [])
          );
        }
      } else if (message instanceof IdentityTokenMessage) {
        this.identity = message.identity;
        if (this.runtime.authToken) {
          this.token = this.runtime.authToken;
        } else {
          this.token = message.token;
        }
        this.clientAddress = message.address;
        this.#emitter.emit(
          'connected',
          this.token,
          this.identity,
          this.clientAddress
        );
      }
    });
  }

  on(
    eventName: EventType | (string & {}),
    callback: (ctx: any /* EventContext */, ...args: any[]) => void
  ): void {
    this.#emitter.on(eventName, callback);
  }

  off(
    eventName: EventType | (string & {}),
    callback: (ctx: any /* EventContext */, ...args: any[]) => void
  ): void {
    this.#emitter.off(eventName, callback);
  }
}

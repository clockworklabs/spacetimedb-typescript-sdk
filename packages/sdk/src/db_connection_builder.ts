// TODO: This is temporary notes for how this should turn out. Will be removed by final PR
// CODEGEN:
// type RemoteTables = {
//   user: UserTable;
//   player: PlayerTable;
// };

import type { CallbackInit, DBConnection } from "./db_connection";
import type { DbContext } from "./db_context";
import type { Identity } from "./identity";
import { stdbLogger } from "./logger";

// type RemoteReducers = {
//   createPlayer: CreatePlayerReducer;
//   onCreatePlayer: CreatePlayerReducerCB;
// };

// ctx.db.user;

// export interface DbContext<DBView = Remotetables, ReducerView> {
//   reducers: ReducerView;
//   db: DBView;
//   isActive: boolean;

//   // TODO: disconnect;
// }

// // These are autogeneratyed types by the codegen. DbContext is from npm package
// const ctx: DBContext<RemoteTables, RemoteReducers>;

// // Autoigenerated EventContext
// export interface EventContext extends DbContext<RemoteTables, RemoteReducers> {
//   event: Event<Reducer>; // ?
// }

// type Reducer =
//   | { tag: 'IdentityConnected'; value: IdentityConnected }
//   | { tag: 'IdentityDisconnected'; value: IdentityDisconnected }
//   | { tag: 'SendMessage'; value: SendMessage }
//   | { tag: 'SetName'; value: SetName };

// export class DbConnection extends DbContext<RemoteTables, RemoteReducers> {
//   static builder(): DbConnectionBuilder<DbConnection, EventContext> {}
// }

/**
 * The database client connection to a SpacetimeDB server.
 */
export class DBConnectionBuilder<
  DBView,
  ReducerView,
  ReducerEnum,
  EventContext extends DbContext<DBView, ReducerView>,
> {
  #connection!: DBConnection;

  /**
   * Creates a new `SpacetimeDBClient` database client and set the initial parameters.
   *
   * @param host The host of the SpacetimeDB server.
   * @param name_or_address The name or address of the SpacetimeDB module.
   * @param auth_token The credentials to use to connect to authenticate with SpacetimeDB.
   *
   * @example
   *
   * ```ts
   * const host = "ws://localhost:3000";
   * const name_or_address = "database_name"
   * const auth_token = undefined;
   *
   * var spacetimeDBClient = new SpacetimeDBClient(host, name_or_address, auth_token, protocol);
   * ```
   */
  constructor(
    base: DBConnection,
  ) {
    this.#connection = base;
  }

  withUri(
    uri: string | URL
  ): DBConnectionBuilder<DBView, ReducerView, ReducerEnum, EventContext> {
    this.#connection.runtime.uri = new URL(uri);
    return this;
  }

  withModuleName(
    nameOrAddress: string
  ): DBConnectionBuilder<DBView, ReducerView, ReducerEnum, EventContext> {
    this.#connection.runtime.nameOrAddress = nameOrAddress;
    return this;
  }

  withCredentials(
    creds: [identity: Identity, token: string]
  ): DBConnectionBuilder<DBView, ReducerView, ReducerEnum, EventContext> {
    const [identity, token] = creds;
    this.#connection.identity = identity;
    this.#connection.token = token;

    return this;
  }

  /**
   * Connect to The SpacetimeDB Websocket For Your Module. By default, this will use a secure websocket connection. The parameters are optional, and if not provided, will use the values provided on construction of the client.
   *
   * @param host The hostname of the SpacetimeDB server. Defaults to the value passed to the `constructor`.
   * @param nameOrAddress The name or address of the SpacetimeDB module. Defaults to the value passed to the `constructor`.
   * @param authToken The credentials to use to authenticate with SpacetimeDB. Defaults to the value passed to the `constructor`.
   *
   * @example
   *
   * ```ts
   * const host = "ws://localhost:3000";
   * const name_or_address = "database_name"
   * const auth_token = undefined;
   *
   * var spacetimeDBClient = new SpacetimeDBClient(host, name_or_address, auth_token);
   * // Connect with the initial parameters
   * spacetimeDBClient.connect();
   * //Set the `auth_token`
   * spacetimeDBClient.connect(undefined, undefined, NEW_TOKEN);
   * ```
   */
  build(): DBConnection {
    stdbLogger('info', 'Connecting to SpacetimeDB WS...');

    let url = new URL(
      `database/subscribe/${this.#connection.runtime.nameOrAddress}`,
      this.#connection.runtime.uri
    );
    if (!/^wss?:/.test(this.#connection.runtime.uri.protocol)) {
      url.protocol = 'ws:';
    }

    let clientAddress = this.#connection.clientAddress.toHexString();
    url.searchParams.set('client_address', clientAddress);

    this.#connection.wsPromise = this.#connection
      .createWSFn({
        url,
        wsProtocol: 'v1.bin.spacetimedb',
        authToken: this.#connection.runtime.authToken,
      })
      .then(v => {
        this.#connection.ws = v;

        this.#connection.ws.onclose = this.#connection.handleOnClose.bind(this);
        this.#connection.ws.onerror = this.#connection.handleOnError.bind(this);
        this.#connection.ws.onopen = this.#connection.handleOnOpen.bind(this);
        this.#connection.ws.onmessage = this.#connection.handleOnMessage.bind(this);

        return v;
      });

    return this.#connection;
  }

  /**
   * Register a callback to be invoked upon authentication with the database.
   *
   * @param token The credentials to use to authenticate with SpacetimeDB.
   * @param identity A unique identifier for a client connected to a database.
   *
   * The callback will be invoked with the `Identity` and private authentication `token` provided by the database to identify this connection.
   *
   * If credentials were supplied to connect, those passed to the callback will be equivalent to the ones used to connect.
   *
   * If the initial connection was anonymous, a new set of credentials will be generated by the database to identify this user.
   *
   * The credentials passed to the callback can be saved and used to authenticate the same user in future connections.
   *
   * @example
   *
   * ```ts
   * spacetimeDBClient.onConnect((token, identity) => {
   *  console.log("Connected to SpacetimeDB");
   *  console.log("Token", token);
   *  console.log("Identity", identity);
   * });
   * ```
   */
  onConnect(
    callback: (identity: Identity, token: string) => void,
    init: CallbackInit = {}
  ): DBConnectionBuilder<DBView, ReducerView, ReducerEnum, EventContext> {
    this.#connection.on('connected', callback);

    if (init.signal) {
      init.signal.addEventListener('abort', () => {
        this.#connection.off('connected', callback);
      });
    }

    return this;
  }

  /**
   * Register a callback to be invoked upon an error.
   *
   * @example
   *
   * ```ts
   * spacetimeDBClient.onError((...args: any[]) => {
   *  stdbLogger("warn","ERROR", args);
   * });
   * ```
   */
  onConnectError(
    callback: (...args: any[]) => void,
    init: CallbackInit = {}
  ): DBConnectionBuilder<DBView, ReducerView, ReducerEnum, EventContext> {
    this.#connection.on('client_error', callback);

    if (init.signal) {
      init.signal.addEventListener('abort', () => {
        this.#connection.off('client_error', callback);
      });
    }

    return this;
  }

  /**
   * Registers a callback to run when a {@link DbConnection} whose connection initially succeeded
   * is disconnected, either after a {@link DbConnection.disconnect} call or due to an error.
   *
   * If the connection ended because of an error, the error is passed to the callback.
   *
   * The `callback` will be installed on the `DbConnection` created by `build`
   * before initiating the connection, ensuring there's no opportunity for the disconnect to happen
   * before the callback is installed.
   *
   * Note that this does not trigger if `build` fails
   * or in cases where {@link DbConnectionBuilder.onConnectError} would trigger.
   * This callback only triggers if the connection closes after `build` returns successfully
   * and {@link DbConnectionBuilder.onConnect} is invoked, i.e., after the `IdentityToken` is received.
   *
   * To simplify SDK implementation, at most one such callback can be registered.
   * Calling `onDisconnect` on the same `DbConnectionBuilder` multiple times throws an error.
   *
   * Unlike callbacks registered via {@link DbConnection},
   * no mechanism is provided to unregister the provided callback.
   * This is a concession to ergonomics; there's no clean place to return a `CallbackId` from this method
   * or from `build`.
   *
   * @param {function(error?: Error): void} callback - The callback to invoke upon disconnection.
   * @throws {Error} Throws an error if called multiple times on the same `DbConnectionBuilder`.
   */
  onDisconnect(
    callback: (...args: any[]) => void,
    init: CallbackInit = {}
  ): DBConnectionBuilder<DBView, ReducerView, ReducerEnum, EventContext> {
    this.#connection.on('disconnected', callback);

    if (init.signal) {
      init.signal.addEventListener('abort', () => {
        this.#connection.off('disconnected', callback);
      });
    }

    return this;
  }
}
// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

import {
  // @ts-ignore
  Address,
  // @ts-ignore
  AlgebraicType,
  // @ts-ignore
  AlgebraicValue,
  // @ts-ignore
  BinaryReader,
  // @ts-ignore
  BinaryWriter,
  // @ts-ignore
  CallReducerFlags,
  // @ts-ignore
  DBConnectionBuilder,
  // @ts-ignore
  DBConnectionImpl,
  // @ts-ignore
  DBContext,
  // @ts-ignore
  Event,
  // @ts-ignore
  EventContextInterface,
  // @ts-ignore
  Identity,
  // @ts-ignore
  ProductType,
  // @ts-ignore
  ProductTypeElement,
  // @ts-ignore
  SumType,
  // @ts-ignore
  SumTypeVariant,
  // @ts-ignore
  TableCache,
} from '@clockworklabs/spacetimedb-sdk';

// Import and reexport all reducer arg types
import { IdentityConnected } from './identity_connected_reducer.ts';
export { IdentityConnected };
import { IdentityDisconnected } from './identity_disconnected_reducer.ts';
export { IdentityDisconnected };
import { Init } from './init_reducer.ts';
export { Init };
import { SendMessage } from './send_message_reducer.ts';
export { SendMessage };
import { SetName } from './set_name_reducer.ts';
export { SetName };

// Import and reexport all table handle types
import { MessageTableHandle } from './message_table.ts';
export { MessageTableHandle };
import { UserTableHandle } from './user_table.ts';
export { UserTableHandle };

// Import and reexport all types
import { Message } from './message_type.ts';
export { Message };
import { User } from './user_type.ts';
export { User };

const REMOTE_MODULE = {
  tables: {
    message: {
      tableName: 'message',
      rowType: Message.getAlgebraicType(),
    },
    user: {
      tableName: 'user',
      rowType: User.getAlgebraicType(),
      primaryKey: 'identity',
    },
  },
  reducers: {
    __identity_connected__: {
      reducerName: '__identity_connected__',
      argsType: IdentityConnected.getAlgebraicType(),
    },
    __identity_disconnected__: {
      reducerName: '__identity_disconnected__',
      argsType: IdentityDisconnected.getAlgebraicType(),
    },
    __init__: {
      reducerName: '__init__',
      argsType: Init.getAlgebraicType(),
    },
    send_message: {
      reducerName: 'send_message',
      argsType: SendMessage.getAlgebraicType(),
    },
    set_name: {
      reducerName: 'set_name',
      argsType: SetName.getAlgebraicType(),
    },
  },
  // Constructors which are used by the DBConnectionImpl to
  // extract type information from the generated RemoteModule.
  eventContextConstructor: (imp: DBConnectionImpl, event: Event<Reducer>) => {
    return {
      ...(imp as DBConnection),
      event,
    };
  },
  dbViewConstructor: (imp: DBConnectionImpl) => {
    return new RemoteTables(imp);
  },
  reducersConstructor: (
    imp: DBConnectionImpl,
    setReducerFlags: SetReducerFlags
  ) => {
    return new RemoteReducers(imp, setReducerFlags);
  },
  setReducerFlagsConstructor: () => {
    return new SetReducerFlags();
  },
};

// A type representing all the possible variants of a reducer.
export type Reducer =
  | never
  | { name: 'IdentityConnected'; args: IdentityConnected }
  | { name: 'IdentityDisconnected'; args: IdentityDisconnected }
  | { name: 'Init'; args: Init }
  | { name: 'SendMessage'; args: SendMessage }
  | { name: 'SetName'; args: SetName };

export class RemoteReducers {
  constructor(
    private connection: DBConnectionImpl,
    private setCallReducerFlags: SetReducerFlags
  ) {}

  identityConnected() {
    this.connection.callReducer(
      '__identity_connected__',
      new Uint8Array(0),
      this.setCallReducerFlags.identityConnectedFlags
    );
  }

  onIdentityConnected(callback: (ctx: EventContext) => void) {
    this.connection.onReducer('__identity_connected__', callback);
  }

  removeOnIdentityConnected(callback: (ctx: EventContext) => void) {
    this.connection.offReducer('__identity_connected__', callback);
  }

  identityDisconnected() {
    this.connection.callReducer(
      '__identity_disconnected__',
      new Uint8Array(0),
      this.setCallReducerFlags.identityDisconnectedFlags
    );
  }

  onIdentityDisconnected(callback: (ctx: EventContext) => void) {
    this.connection.onReducer('__identity_disconnected__', callback);
  }

  removeOnIdentityDisconnected(callback: (ctx: EventContext) => void) {
    this.connection.offReducer('__identity_disconnected__', callback);
  }

  init() {
    this.connection.callReducer(
      '__init__',
      new Uint8Array(0),
      this.setCallReducerFlags.initFlags
    );
  }

  onInit(callback: (ctx: EventContext) => void) {
    this.connection.onReducer('__init__', callback);
  }

  removeOnInit(callback: (ctx: EventContext) => void) {
    this.connection.offReducer('__init__', callback);
  }

  sendMessage(text: string) {
    const __args = { text };
    let __writer = new BinaryWriter(1024);
    SendMessage.getAlgebraicType().serialize(__writer, __args);
    let __argsBuffer = __writer.getBuffer();
    this.connection.callReducer(
      'send_message',
      __argsBuffer,
      this.setCallReducerFlags.sendMessageFlags
    );
  }

  onSendMessage(callback: (ctx: EventContext, text: string) => void) {
    this.connection.onReducer('send_message', callback);
  }

  removeOnSendMessage(callback: (ctx: EventContext, text: string) => void) {
    this.connection.offReducer('send_message', callback);
  }

  setName(name: string) {
    const __args = { name };
    let __writer = new BinaryWriter(1024);
    SetName.getAlgebraicType().serialize(__writer, __args);
    let __argsBuffer = __writer.getBuffer();
    this.connection.callReducer(
      'set_name',
      __argsBuffer,
      this.setCallReducerFlags.setNameFlags
    );
  }

  onSetName(callback: (ctx: EventContext, name: string) => void) {
    this.connection.onReducer('set_name', callback);
  }

  removeOnSetName(callback: (ctx: EventContext, name: string) => void) {
    this.connection.offReducer('set_name', callback);
  }
}

export class SetReducerFlags {
  identityConnectedFlags: CallReducerFlags;
  identityConnected(flags: CallReducerFlags) {
    this.identityConnectedFlags = flags;
  }
  identityDisconnectedFlags: CallReducerFlags;
  identityDisconnected(flags: CallReducerFlags) {
    this.identityDisconnectedFlags = flags;
  }
  initFlags: CallReducerFlags;
  init(flags: CallReducerFlags) {
    this.initFlags = flags;
  }
  sendMessageFlags: CallReducerFlags;
  sendMessage(flags: CallReducerFlags) {
    this.sendMessageFlags = flags;
  }
  setNameFlags: CallReducerFlags;
  setName(flags: CallReducerFlags) {
    this.setNameFlags = flags;
  }
}

export class RemoteTables {
  constructor(private connection: DBConnectionImpl) {}

  #message = this.connection.clientCache.getOrCreateTable<Message>(
    REMOTE_MODULE.tables.message
  );
  get message(): MessageTableHandle {
    return new MessageTableHandle(this.#message);
  }

  #user = this.connection.clientCache.getOrCreateTable<User>(
    REMOTE_MODULE.tables.user
  );
  get user(): UserTableHandle {
    return new UserTableHandle(this.#user);
  }
}

export class DBConnection extends DBConnectionImpl<
  RemoteTables,
  RemoteReducers,
  SetReducerFlags
> {
  static builder = (): DBConnectionBuilder<DBConnection> => {
    return new DBConnectionBuilder<DBConnection>(
      REMOTE_MODULE,
      (imp: DBConnectionImpl) => imp as DBConnection
    );
  };
}

export type EventContext = EventContextInterface<
  RemoteTables,
  RemoteReducers,
  SetReducerFlags,
  Reducer
>;

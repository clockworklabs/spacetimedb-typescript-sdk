// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN YOUR MODULE SOURCE CODE INSTEAD.

/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import {
  Address,
  AlgebraicType,
  AlgebraicValue,
  BinaryReader,
  BinaryWriter,
  CallReducerFlags,
  DBConnectionBuilder,
  DBConnectionImpl,
  DBContext,
  ErrorContextInterface,
  Event,
  EventContextInterface,
  Identity,
  ProductType,
  ProductTypeElement,
  ReducerEventContextInterface,
  SubscriptionBuilderImpl,
  SubscriptionEventContextInterface,
  SumType,
  SumTypeVariant,
  TableCache,
  deepEqual,
} from '@clockworklabs/spacetimedb-sdk';

// Import and reexport all reducer arg types
import { IdentityConnected } from './identity_connected_reducer.ts';
export { IdentityConnected };
import { IdentityDisconnected } from './identity_disconnected_reducer.ts';
export { IdentityDisconnected };
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
      rowType: Message.getTypeScriptAlgebraicType(),
    },
    user: {
      tableName: 'user',
      rowType: User.getTypeScriptAlgebraicType(),
      primaryKey: 'identity',
    },
  },
  reducers: {
    identity_connected: {
      reducerName: 'identity_connected',
      argsType: IdentityConnected.getTypeScriptAlgebraicType(),
    },
    identity_disconnected: {
      reducerName: 'identity_disconnected',
      argsType: IdentityDisconnected.getTypeScriptAlgebraicType(),
    },
    send_message: {
      reducerName: 'send_message',
      argsType: SendMessage.getTypeScriptAlgebraicType(),
    },
    set_name: {
      reducerName: 'set_name',
      argsType: SetName.getTypeScriptAlgebraicType(),
    },
  },
  // Constructors which are used by the DBConnectionImpl to
  // extract type information from the generated RemoteModule.
  //
  // NOTE: This is not strictly necessary for `eventContextConstructor` because
  // all we do is build a TypeScript object which we could have done inside the
  // SDK, but if in the future we wanted to create a class this would be
  // necessary because classes have methods, so we'll keep it.
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
  | { name: 'SendMessage'; args: SendMessage }
  | { name: 'SetName'; args: SetName };

export class RemoteReducers {
  constructor(
    private connection: DBConnectionImpl,
    private setCallReducerFlags: SetReducerFlags
  ) {}

<<<<<<< HEAD
  onIdentityConnected(callback: (ctx: ReducerEventContext) => void) {
    this.connection.onReducer('identity_connected', callback);
  }

  removeOnIdentityConnected(callback: (ctx: ReducerEventContext) => void) {
    this.connection.offReducer('identity_connected', callback);
  }

  onIdentityDisconnected(callback: (ctx: ReducerEventContext) => void) {
    this.connection.onReducer('identity_disconnected', callback);
  }

  removeOnIdentityDisconnected(callback: (ctx: ReducerEventContext) => void) {
=======
  onIdentityConnected(callback: (ctx: EventContext) => void) {
    this.connection.onReducer('identity_connected', callback);
  }

  removeOnIdentityConnected(callback: (ctx: EventContext) => void) {
    this.connection.offReducer('identity_connected', callback);
  }

  onIdentityDisconnected(callback: (ctx: EventContext) => void) {
    this.connection.onReducer('identity_disconnected', callback);
  }

  removeOnIdentityDisconnected(callback: (ctx: EventContext) => void) {
>>>>>>> main
    this.connection.offReducer('identity_disconnected', callback);
  }

  sendMessage(text: string) {
    const __args = { text };
    let __writer = new BinaryWriter(1024);
    SendMessage.getTypeScriptAlgebraicType().serialize(__writer, __args);
    let __argsBuffer = __writer.getBuffer();
    this.connection.callReducer(
      'send_message',
      __argsBuffer,
      this.setCallReducerFlags.sendMessageFlags
    );
  }

  onSendMessage(callback: (ctx: ReducerEventContext, text: string) => void) {
    this.connection.onReducer('send_message', callback);
  }

  removeOnSendMessage(
    callback: (ctx: ReducerEventContext, text: string) => void
  ) {
    this.connection.offReducer('send_message', callback);
  }

  setName(name: string) {
    const __args = { name };
    let __writer = new BinaryWriter(1024);
    SetName.getTypeScriptAlgebraicType().serialize(__writer, __args);
    let __argsBuffer = __writer.getBuffer();
    this.connection.callReducer(
      'set_name',
      __argsBuffer,
      this.setCallReducerFlags.setNameFlags
    );
  }

  onSetName(callback: (ctx: ReducerEventContext, name: string) => void) {
    this.connection.onReducer('set_name', callback);
  }

  removeOnSetName(callback: (ctx: ReducerEventContext, name: string) => void) {
    this.connection.offReducer('set_name', callback);
  }
}

export class SetReducerFlags {
  sendMessageFlags: CallReducerFlags = 'FullUpdate';
  sendMessage(flags: CallReducerFlags) {
    this.sendMessageFlags = flags;
  }

  setNameFlags: CallReducerFlags = 'FullUpdate';
  setName(flags: CallReducerFlags) {
    this.setNameFlags = flags;
  }
}

export class RemoteTables {
  constructor(private connection: DBConnectionImpl) {}

  get message(): MessageTableHandle {
    return new MessageTableHandle(
      this.connection.clientCache.getOrCreateTable<Message>(
        REMOTE_MODULE.tables.message
      )
    );
  }

  get user(): UserTableHandle {
    return new UserTableHandle(
      this.connection.clientCache.getOrCreateTable<User>(
        REMOTE_MODULE.tables.user
      )
    );
  }
}

export class SubscriptionBuilder extends SubscriptionBuilderImpl<
  RemoteTables,
  RemoteReducers,
  SetReducerFlags
> {}

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
  subscriptionBuilder = (): SubscriptionBuilder => {
    return new SubscriptionBuilder(this);
  };
}

export type EventContext = EventContextInterface<
  RemoteTables,
  RemoteReducers,
  SetReducerFlags,
  Reducer
>;
export type ReducerEventContext = ReducerEventContextInterface<
  RemoteTables,
  RemoteReducers,
  SetReducerFlags,
  Reducer
>;
export type SubscriptionEventContext = SubscriptionEventContextInterface<
  RemoteTables,
  RemoteReducers,
  SetReducerFlags
>;
export type ErrorContext = ErrorContextInterface<
  RemoteTables,
  RemoteReducers,
  SetReducerFlags
>;

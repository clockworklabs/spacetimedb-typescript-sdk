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
  // @ts-ignore
  deepEqual,
} from '@clockworklabs/spacetimedb-sdk';

// Import and reexport all reducer arg types
import { CreatePlayer } from './create_player_reducer.ts';
export { CreatePlayer };

// Import and reexport all table handle types
import { PlayerTableHandle } from './player_table.ts';
export { PlayerTableHandle };
import { UserTableHandle } from './user_table.ts';
export { UserTableHandle };

// Import and reexport all types
import { Player } from './player_type.ts';
export { Player };
import { Point } from './point_type.ts';
export { Point };
import { User } from './user_type.ts';
export { User };

const REMOTE_MODULE = {
  tables: {
    player: {
      tableName: 'player',
      rowType: Player.getTypeScriptAlgebraicType(),
      primaryKey: 'owner_id',
    },
    user: {
      tableName: 'user',
      rowType: User.getTypeScriptAlgebraicType(),
      primaryKey: 'identity',
    },
  },
  reducers: {
    create_player: {
      reducerName: 'create_player',
      argsType: CreatePlayer.getTypeScriptAlgebraicType(),
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
export type Reducer = never | { name: 'CreatePlayer'; args: CreatePlayer };

export class RemoteReducers {
  constructor(
    private connection: DBConnectionImpl,
    private setCallReducerFlags: SetReducerFlags
  ) {}

  createPlayer(name: string, location: Point) {
    const __args = { name, location };
    let __writer = new BinaryWriter(1024);
    CreatePlayer.getTypeScriptAlgebraicType().serialize(__writer, __args);
    let __argsBuffer = __writer.getBuffer();
    this.connection.callReducer(
      'create_player',
      __argsBuffer,
      this.setCallReducerFlags.createPlayerFlags
    );
  }

  onCreatePlayer(
    callback: (ctx: EventContext, name: string, location: Point) => void
  ) {
    this.connection.onReducer('create_player', callback);
  }

  removeOnCreatePlayer(
    callback: (ctx: EventContext, name: string, location: Point) => void
  ) {
    this.connection.offReducer('create_player', callback);
  }
}

export class SetReducerFlags {
  createPlayerFlags: CallReducerFlags = 'FullUpdate';
  createPlayer(flags: CallReducerFlags) {
    this.createPlayerFlags = flags;
  }
}

export class RemoteTables {
  constructor(private connection: DBConnectionImpl) {}

  get player(): PlayerTableHandle {
    return new PlayerTableHandle(
      this.connection.clientCache.getOrCreateTable<Player>(
        REMOTE_MODULE.tables.player
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

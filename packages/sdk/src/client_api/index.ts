// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN YOUR MODULE SOURCE CODE INSTEAD.

/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import {
  AlgebraicType,
  AlgebraicValue,
  BinaryReader,
  BinaryWriter,
  CallReducerFlags,
  ConnectionId,
  DbConnectionBuilder,
  DbConnectionImpl,
  DbContext,
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
  TimeDuration,
  Timestamp,
  deepEqual,
} from '../index';

// Import and reexport all reducer arg types

// Import and reexport all table handle types

// Import and reexport all types
import { BsatnRowList } from './bsatn_row_list_type.ts';
export { BsatnRowList };
import { CallReducer } from './call_reducer_type.ts';
export { CallReducer };
import { ClientMessage } from './client_message_type.ts';
export { ClientMessage };
import { CompressableQueryUpdate } from './compressable_query_update_type.ts';
export { CompressableQueryUpdate };
import { DatabaseUpdate } from './database_update_type.ts';
export { DatabaseUpdate };
import { EnergyQuanta } from './energy_quanta_type.ts';
export { EnergyQuanta };
import { IdentityToken } from './identity_token_type.ts';
export { IdentityToken };
import { InitialSubscription } from './initial_subscription_type.ts';
export { InitialSubscription };
import { OneOffQuery } from './one_off_query_type.ts';
export { OneOffQuery };
import { OneOffQueryResponse } from './one_off_query_response_type.ts';
export { OneOffQueryResponse };
import { OneOffTable } from './one_off_table_type.ts';
export { OneOffTable };
import { QueryId } from './query_id_type.ts';
export { QueryId };
import { QueryUpdate } from './query_update_type.ts';
export { QueryUpdate };
import { ReducerCallInfo } from './reducer_call_info_type.ts';
export { ReducerCallInfo };
import { RowSizeHint } from './row_size_hint_type.ts';
export { RowSizeHint };
import { ServerMessage } from './server_message_type.ts';
export { ServerMessage };
import { Subscribe } from './subscribe_type.ts';
export { Subscribe };
import { SubscribeApplied } from './subscribe_applied_type.ts';
export { SubscribeApplied };
import { SubscribeMulti } from './subscribe_multi_type.ts';
export { SubscribeMulti };
import { SubscribeMultiApplied } from './subscribe_multi_applied_type.ts';
export { SubscribeMultiApplied };
import { SubscribeRows } from './subscribe_rows_type.ts';
export { SubscribeRows };
import { SubscribeSingle } from './subscribe_single_type.ts';
export { SubscribeSingle };
import { SubscriptionError } from './subscription_error_type.ts';
export { SubscriptionError };
import { TableUpdate } from './table_update_type.ts';
export { TableUpdate };
import { TransactionUpdate } from './transaction_update_type.ts';
export { TransactionUpdate };
import { TransactionUpdateLight } from './transaction_update_light_type.ts';
export { TransactionUpdateLight };
import { Unsubscribe } from './unsubscribe_type.ts';
export { Unsubscribe };
import { UnsubscribeApplied } from './unsubscribe_applied_type.ts';
export { UnsubscribeApplied };
import { UnsubscribeMulti } from './unsubscribe_multi_type.ts';
export { UnsubscribeMulti };
import { UnsubscribeMultiApplied } from './unsubscribe_multi_applied_type.ts';
export { UnsubscribeMultiApplied };
import { UpdateStatus } from './update_status_type.ts';
export { UpdateStatus };

const REMOTE_MODULE = {
  tables: {},
  reducers: {},
  // Constructors which are used by the DbConnectionImpl to
  // extract type information from the generated RemoteModule.
  //
  // NOTE: This is not strictly necessary for `eventContextConstructor` because
  // all we do is build a TypeScript object which we could have done inside the
  // SDK, but if in the future we wanted to create a class this would be
  // necessary because classes have methods, so we'll keep it.
  eventContextConstructor: (imp: DbConnectionImpl, event: Event<Reducer>) => {
    return {
      ...(imp as DbConnection),
      event,
    };
  },
  dbViewConstructor: (imp: DbConnectionImpl) => {
    return new RemoteTables(imp);
  },
  reducersConstructor: (
    imp: DbConnectionImpl,
    setReducerFlags: SetReducerFlags
  ) => {
    return new RemoteReducers(imp, setReducerFlags);
  },
  setReducerFlagsConstructor: () => {
    return new SetReducerFlags();
  },
};

// A type representing all the possible variants of a reducer.
export type Reducer = never;

export class RemoteReducers {
  constructor(
    private connection: DbConnectionImpl,
    private setCallReducerFlags: SetReducerFlags
  ) {}
}

export class SetReducerFlags {}

export class RemoteTables {
  constructor(private connection: DbConnectionImpl) {}
}

export class SubscriptionBuilder extends SubscriptionBuilderImpl<
  RemoteTables,
  RemoteReducers,
  SetReducerFlags
> {}

export class DbConnection extends DbConnectionImpl<
  RemoteTables,
  RemoteReducers,
  SetReducerFlags
> {
  static builder = (): DbConnectionBuilder<
    DbConnection,
    ErrorContext,
    SubscriptionEventContext
  > => {
    return new DBConnectionBuilder<
      DBConnection,
      ErrorContext,
      SubscriptionEventContext
    >(REMOTE_MODULE, (imp: DBConnectionImpl) => imp as DBConnection);
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

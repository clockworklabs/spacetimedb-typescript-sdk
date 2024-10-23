import type { AlgebraicType } from './algebraic_type';
import type { DBConnectionImpl } from './db_connection_impl';
import type { Event } from './event';

export interface TableRuntimeTypeInfo {
  tableIndex: number;
  tableName: string;
  rowType: AlgebraicType;
  primaryKey?: string | undefined;
}

export interface ReducerRuntimeTypeInfo {
  reducer
  reducerName: string;
  argsType: AlgebraicType;
}

export default interface SpacetimeModule {
  tables: { [index: number]: TableRuntimeTypeInfo };
  reducers: { [index: number]: ReducerRuntimeTypeInfo };
  eventContextConstructor: (imp: DBConnectionImpl, event: any) => any;
  dbViewConstructor: (connection: DBConnectionImpl) => any;
  reducersConstructor: (
    connection: DBConnectionImpl,
    setReducerFlags: any
  ) => any;
  setReducerFlagsConstructor: () => any;
}

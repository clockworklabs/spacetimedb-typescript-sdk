import type { AlgebraicType } from "./algebraic_type";
import type { AlgebraicValue, ReducerArgsAdapter } from "./algebraic_value";
import type { ClientCache } from "./client_cache";

export interface TableRuntimeTypeInfo {
    tableName: string;
    rowType: AlgebraicType;
    primaryKey: string | undefined;
}

export interface ReducerRuntimeTypeInfo {
    reducerName: string;
    reducerArgsType: AlgebraicType;
}

export default interface SpacetimeModule {
    tables: {[name: string]: TableRuntimeTypeInfo};
    reducers: {[name: string]: ReducerRuntimeTypeInfo};
    createRemoteTables(clientCache: ClientCache): any;
    createRemoteReducers(): any;
}
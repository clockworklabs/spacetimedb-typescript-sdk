import type { AlgebraicType } from "./algebraic_type";
import type { AlgebraicValue, ReducerArgsAdapter } from "./algebraic_value";

export interface TableRuntimeTypeInfo {
    tableName: string;
    rowType: AlgebraicType;
    primaryKey: string | undefined;
    rowFromValue: (value: AlgebraicValue) => any;
}

export interface ReducerRuntimeTypeInfo {
    reducerName: string;
    deserializeArgs: (args: ReducerArgsAdapter) => any[];
}

export default interface SpacetimeModule {
    tables: Map<string, TableRuntimeTypeInfo>;
    reducers: Map<string, ReducerRuntimeTypeInfo>;
}
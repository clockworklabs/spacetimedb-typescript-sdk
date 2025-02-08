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
  TimeDuration,
  Timestamp,
  deepEqual,
} from '@clockworklabs/spacetimedb-sdk';
import { OneOffTable as __OneOffTable } from './one_off_table_type';

export type OneOffQueryResponse = {
  messageId: Uint8Array;
  error: string | undefined;
  tables: __OneOffTable[];
  totalHostExecutionDuration: TimeDuration;
};

/**
 * A namespace for generated helper functions.
 */
export namespace OneOffQueryResponse {
  /**
   * A function which returns this type represented as an AlgebraicType.
   * This function is derived from the AlgebraicType used to generate this type.
   */
  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        'messageId',
        AlgebraicType.createArrayType(AlgebraicType.createU8Type())
      ),
      new ProductTypeElement(
        'error',
        AlgebraicType.createOptionType(AlgebraicType.createStringType())
      ),
      new ProductTypeElement(
        'tables',
        AlgebraicType.createArrayType(
          __OneOffTable.getTypeScriptAlgebraicType()
        )
      ),
      new ProductTypeElement(
        'totalHostExecutionDuration',
        AlgebraicType.createTimeDurationType()
      ),
    ]);
  }

  export function serialize(
    writer: BinaryWriter,
    value: OneOffQueryResponse
  ): void {
    OneOffQueryResponse.getTypeScriptAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): OneOffQueryResponse {
    return OneOffQueryResponse.getTypeScriptAlgebraicType().deserialize(reader);
  }
}

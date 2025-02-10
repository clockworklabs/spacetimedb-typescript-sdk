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
} from '../index';
export type ReducerCallInfo = {
  reducerName: string;
  reducerId: number;
  args: Uint8Array;
  requestId: number;
};

/**
 * A namespace for generated helper functions.
 */
export namespace ReducerCallInfo {
  /**
   * A function which returns this type represented as an AlgebraicType.
   * This function is derived from the AlgebraicType used to generate this type.
   */
  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement('reducerName', AlgebraicType.createStringType()),
      new ProductTypeElement('reducerId', AlgebraicType.createU32Type()),
      new ProductTypeElement(
        'args',
        AlgebraicType.createArrayType(AlgebraicType.createU8Type())
      ),
      new ProductTypeElement('requestId', AlgebraicType.createU32Type()),
    ]);
  }

  export function serialize(
    writer: BinaryWriter,
    value: ReducerCallInfo
  ): void {
    ReducerCallInfo.getTypeScriptAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): ReducerCallInfo {
    return ReducerCallInfo.getTypeScriptAlgebraicType().deserialize(reader);
  }
}

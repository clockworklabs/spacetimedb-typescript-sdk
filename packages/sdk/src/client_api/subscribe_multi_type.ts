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
import { QueryId as __QueryId } from './query_id_type';

export type SubscribeMulti = {
  queryStrings: string[];
  requestId: number;
  queryId: __QueryId;
};

/**
 * A namespace for generated helper functions.
 */
export namespace SubscribeMulti {
  /**
   * A function which returns this type represented as an AlgebraicType.
   * This function is derived from the AlgebraicType used to generate this type.
   */
  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        'queryStrings',
        AlgebraicType.createArrayType(AlgebraicType.createStringType())
      ),
      new ProductTypeElement('requestId', AlgebraicType.createU32Type()),
      new ProductTypeElement('queryId', __QueryId.getTypeScriptAlgebraicType()),
    ]);
  }

  export function serialize(writer: BinaryWriter, value: SubscribeMulti): void {
    SubscribeMulti.getTypeScriptAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): SubscribeMulti {
    return SubscribeMulti.getTypeScriptAlgebraicType().deserialize(reader);
  }
}

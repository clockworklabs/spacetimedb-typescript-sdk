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
import { TableUpdate as __TableUpdate } from './table_update_type';

export type SubscribeRows = {
  tableId: number;
  tableName: string;
  tableRows: __TableUpdate;
};

/**
 * A namespace for generated helper functions.
 */
export namespace SubscribeRows {
  /**
   * A function which returns this type represented as an AlgebraicType.
   * This function is derived from the AlgebraicType used to generate this type.
   */
  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement('tableId', AlgebraicType.createU32Type()),
      new ProductTypeElement('tableName', AlgebraicType.createStringType()),
      new ProductTypeElement(
        'tableRows',
        __TableUpdate.getTypeScriptAlgebraicType()
      ),
    ]);
  }

  export function serialize(writer: BinaryWriter, value: SubscribeRows): void {
    SubscribeRows.getTypeScriptAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): SubscribeRows {
    return SubscribeRows.getTypeScriptAlgebraicType().deserialize(reader);
  }
}

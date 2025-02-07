// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN YOUR MODULE SOURCE CODE INSTEAD.

import {
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
  ConnectionId,
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
} from '../index';
// @ts-ignore
import { DatabaseUpdate as __DatabaseUpdate } from './database_update_type';

export type InitialSubscription = {
  databaseUpdate: __DatabaseUpdate;
  requestId: number;
  totalHostExecutionDurationMicros: bigint;
};

/**
 * A namespace for generated helper functions.
 */
export namespace InitialSubscription {
  /**
   * A function which returns this type represented as an AlgebraicType.
   * This function is derived from the AlgebraicType used to generate this type.
   */
  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        'databaseUpdate',
        __DatabaseUpdate.getTypeScriptAlgebraicType()
      ),
      new ProductTypeElement('requestId', AlgebraicType.createU32Type()),
      new ProductTypeElement(
        'totalHostExecutionDurationMicros',
        AlgebraicType.createU64Type()
      ),
    ]);
  }

  export function serialize(
    writer: BinaryWriter,
    value: InitialSubscription
  ): void {
    InitialSubscription.getTypeScriptAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): InitialSubscription {
    return InitialSubscription.getTypeScriptAlgebraicType().deserialize(reader);
  }
}

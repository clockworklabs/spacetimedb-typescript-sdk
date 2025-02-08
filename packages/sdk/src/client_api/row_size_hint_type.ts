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
// A namespace for generated variants and helper functions.
export namespace RowSizeHint {
  // These are the generated variant types for each variant of the tagged union.
  // One type is generated per variant and will be used in the `value` field of
  // the tagged union.
  export type FixedSize = { tag: 'FixedSize'; value: number };
  export type RowOffsets = { tag: 'RowOffsets'; value: bigint[] };

  // Helper functions for constructing each variant of the tagged union.
  // ```
  // const foo = Foo.A(42);
  // assert!(foo.tag === "A");
  // assert!(foo.value === 42);
  // ```
  export const FixedSize = (value: number): RowSizeHint => ({
    tag: 'FixedSize',
    value,
  });
  export const RowOffsets = (value: bigint[]): RowSizeHint => ({
    tag: 'RowOffsets',
    value,
  });

  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createSumType([
      new SumTypeVariant('FixedSize', AlgebraicType.createU16Type()),
      new SumTypeVariant(
        'RowOffsets',
        AlgebraicType.createArrayType(AlgebraicType.createU64Type())
      ),
    ]);
  }

  export function serialize(writer: BinaryWriter, value: RowSizeHint): void {
    RowSizeHint.getTypeScriptAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): RowSizeHint {
    return RowSizeHint.getTypeScriptAlgebraicType().deserialize(reader);
  }
}

// The tagged union or sum type for the algebraic type `RowSizeHint`.
export type RowSizeHint = RowSizeHint.FixedSize | RowSizeHint.RowOffsets;

export default RowSizeHint;

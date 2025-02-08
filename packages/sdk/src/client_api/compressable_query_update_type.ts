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
import { QueryUpdate as __QueryUpdate } from './query_update_type';

// A namespace for generated variants and helper functions.
export namespace CompressableQueryUpdate {
  // These are the generated variant types for each variant of the tagged union.
  // One type is generated per variant and will be used in the `value` field of
  // the tagged union.
  export type Uncompressed = { tag: 'Uncompressed'; value: __QueryUpdate };
  export type Brotli = { tag: 'Brotli'; value: Uint8Array };
  export type Gzip = { tag: 'Gzip'; value: Uint8Array };

  // Helper functions for constructing each variant of the tagged union.
  // ```
  // const foo = Foo.A(42);
  // assert!(foo.tag === "A");
  // assert!(foo.value === 42);
  // ```
  export const Uncompressed = (
    value: __QueryUpdate
  ): CompressableQueryUpdate => ({ tag: 'Uncompressed', value });
  export const Brotli = (value: Uint8Array): CompressableQueryUpdate => ({
    tag: 'Brotli',
    value,
  });
  export const Gzip = (value: Uint8Array): CompressableQueryUpdate => ({
    tag: 'Gzip',
    value,
  });

  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createSumType([
      new SumTypeVariant(
        'Uncompressed',
        __QueryUpdate.getTypeScriptAlgebraicType()
      ),
      new SumTypeVariant(
        'Brotli',
        AlgebraicType.createArrayType(AlgebraicType.createU8Type())
      ),
      new SumTypeVariant(
        'Gzip',
        AlgebraicType.createArrayType(AlgebraicType.createU8Type())
      ),
    ]);
  }

  export function serialize(
    writer: BinaryWriter,
    value: CompressableQueryUpdate
  ): void {
    CompressableQueryUpdate.getTypeScriptAlgebraicType().serialize(
      writer,
      value
    );
  }

  export function deserialize(reader: BinaryReader): CompressableQueryUpdate {
    return CompressableQueryUpdate.getTypeScriptAlgebraicType().deserialize(
      reader
    );
  }
}

// The tagged union or sum type for the algebraic type `CompressableQueryUpdate`.
export type CompressableQueryUpdate =
  | CompressableQueryUpdate.Uncompressed
  | CompressableQueryUpdate.Brotli
  | CompressableQueryUpdate.Gzip;

export default CompressableQueryUpdate;

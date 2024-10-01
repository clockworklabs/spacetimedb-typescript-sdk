// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

import {
  // @ts-ignore
  Address,
  // @ts-ignore
  AlgebraicType,
  // @ts-ignore
  AlgebraicValue,
  // @ts-ignore
  BinaryReader,
  // @ts-ignore
  BinaryWriter,
  // @ts-ignore
  DBConnectionBuilder,
  // @ts-ignore
  DBConnectionImpl,
  // @ts-ignore
  DBContext,
  // @ts-ignore
  Event,
  // @ts-ignore
  EventContext,
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
} from "../index";
// @ts-ignore
import { QueryUpdate as __QueryUpdate } from "./query_update_type";

// A namespace for generated variants and helper functions.
export namespace CompressableQueryUpdate {
  // These are the generated variant types for each variant of the tagged union.
  // One type is generated per variant and will be used in the `value` field of
  // the tagged union.
  export type Uncompressed = { tag: "Uncompressed", value: __QueryUpdate };
  export type Brotli = { tag: "Brotli", value: number[] };

  // Helper functions for constructing each variant of the tagged union.
  // ```
  // const foo = Foo.A(42);
  // assert!(foo.tag === "A");
  // assert!(foo.value === 42);
  // ```
  export const Uncompressed = (value: __QueryUpdate): CompressableQueryUpdate => ({ tag: "Uncompressed", value });
  export const Brotli = (value: number[]): CompressableQueryUpdate => ({ tag: "Brotli", value });

  export function getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createSumType([
      new SumTypeVariant("Uncompressed", __QueryUpdate.getAlgebraicType()),
      new SumTypeVariant("Brotli", AlgebraicType.createArrayType(AlgebraicType.createU8Type())),
    ]);
  }

  export function serialize(writer: BinaryWriter, value: CompressableQueryUpdate): void {
      CompressableQueryUpdate.getAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): CompressableQueryUpdate {
      return CompressableQueryUpdate.getAlgebraicType().deserialize(reader);
  }

}

// The tagged union or sum type for the algebraic type `CompressableQueryUpdate`.
export type CompressableQueryUpdate = CompressableQueryUpdate.Uncompressed | CompressableQueryUpdate.Brotli;

export default CompressableQueryUpdate;


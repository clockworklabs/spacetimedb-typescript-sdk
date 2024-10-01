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
} from "@clockworklabs/spacetimedb-sdk";

export type IdentityDisconnected = {};

/**
 * A namespace for generated helper functions.
 */
export namespace IdentityDisconnected {
  /**
  * A function which returns this type represented as an AlgebraicType.
  * This function is derived from the AlgebraicType used to generate this type.
  */
  export function getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
    ]);
  }

  export function serialize(writer: BinaryWriter, value: IdentityDisconnected): void {
    IdentityDisconnected.getAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): IdentityDisconnected {
    return IdentityDisconnected.getAlgebraicType().deserialize(reader);
  }
}


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
} from '@clockworklabs/spacetimedb-sdk';
export type User = {
  identity: Identity;
  username: string;
};

/**
 * A namespace for generated helper functions.
 */
export namespace User {
  /**
   * A function which returns this type represented as an AlgebraicType.
   * This function is derived from the AlgebraicType used to generate this type.
   */
  export function getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement('identity', AlgebraicType.createIdentityType()),
      new ProductTypeElement('username', AlgebraicType.createStringType()),
    ]);
  }

  export function serialize(writer: BinaryWriter, value: User): void {
    const converted = {
      identity: value.identity,
      username: value.username,
    };
    User.getAlgebraicType().serialize(writer, converted);
  }

  export function deserialize(reader: BinaryReader): User {
    const value = User.getAlgebraicType().deserialize(reader);
    return {
      identity: value.identity,
      username: value.username,
    };
  }
}

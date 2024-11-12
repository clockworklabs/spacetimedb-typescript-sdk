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
  CallReducerFlags,
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
} from '..';
// @ts-ignore
import { IdentityToken as __IdentityToken } from './identity_token_type';
// @ts-ignore
import { IdsToNames as __IdsToNames } from './ids_to_names_type';

export type AfterConnecting = {
  identityToken: __IdentityToken;
  idsToNames: __IdsToNames;
};

/**
 * A namespace for generated helper functions.
 */
export namespace AfterConnecting {
  /**
   * A function which returns this type represented as an AlgebraicType.
   * This function is derived from the AlgebraicType used to generate this type.
   */
  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        'identityToken',
        __IdentityToken.getTypeScriptAlgebraicType()
      ),
      new ProductTypeElement(
        'idsToNames',
        __IdsToNames.getTypeScriptAlgebraicType()
      ),
    ]);
  }

  export function serialize(
    writer: BinaryWriter,
    value: AfterConnecting
  ): void {
    AfterConnecting.getTypeScriptAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): AfterConnecting {
    return AfterConnecting.getTypeScriptAlgebraicType().deserialize(reader);
  }
}
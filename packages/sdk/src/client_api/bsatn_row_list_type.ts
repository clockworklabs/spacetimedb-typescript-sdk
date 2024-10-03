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
} from '../index';
// @ts-ignore
import { RowSizeHint as __RowSizeHint } from './row_size_hint_type';

export type BsatnRowList = {
  sizeHint: __RowSizeHint;
  rowsData: Uint8Array;
};

/**
 * A namespace for generated helper functions.
 */
export namespace BsatnRowList {
  /**
   * A function which returns this type represented as an AlgebraicType.
   * This function is derived from the AlgebraicType used to generate this type.
   */
  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        'sizeHint',
        __RowSizeHint.getTypeScriptAlgebraicType()
      ),
      new ProductTypeElement(
        'rowsData',
        AlgebraicType.createArrayType(AlgebraicType.createU8Type())
      ),
    ]);
  }

  export function serialize(writer: BinaryWriter, value: BsatnRowList): void {
    BsatnRowList.getTypeScriptAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): BsatnRowList {
    return BsatnRowList.getTypeScriptAlgebraicType().deserialize(reader);
  }
}

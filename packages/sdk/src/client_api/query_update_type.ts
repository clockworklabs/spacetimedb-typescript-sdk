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
  // @ts-ignore
  deepEqual,
} from '..';
// @ts-ignore
import { BsatnRowList as __BsatnRowList } from './bsatn_row_list_type';

export type QueryUpdate = {
  deletes: __BsatnRowList;
  inserts: __BsatnRowList;
};

/**
 * A namespace for generated helper functions.
 */
export namespace QueryUpdate {
  /**
   * A function which returns this type represented as an AlgebraicType.
   * This function is derived from the AlgebraicType used to generate this type.
   */
  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        'deletes',
        __BsatnRowList.getTypeScriptAlgebraicType()
      ),
      new ProductTypeElement(
        'inserts',
        __BsatnRowList.getTypeScriptAlgebraicType()
      ),
    ]);
  }

  export function serialize(writer: BinaryWriter, value: QueryUpdate): void {
    QueryUpdate.getTypeScriptAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): QueryUpdate {
    return QueryUpdate.getTypeScriptAlgebraicType().deserialize(reader);
  }
}

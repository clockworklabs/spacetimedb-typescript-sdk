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
export type IdsToNames = {
  reducerIds: number[];
  reducerNames: string[];
  tableIds: number[];
  tableNames: string[];
};

/**
 * A namespace for generated helper functions.
 */
export namespace IdsToNames {
  /**
   * A function which returns this type represented as an AlgebraicType.
   * This function is derived from the AlgebraicType used to generate this type.
   */
  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        'reducerIds',
        AlgebraicType.createArrayType(AlgebraicType.createU32Type())
      ),
      new ProductTypeElement(
        'reducerNames',
        AlgebraicType.createArrayType(AlgebraicType.createStringType())
      ),
      new ProductTypeElement(
        'tableIds',
        AlgebraicType.createArrayType(AlgebraicType.createU32Type())
      ),
      new ProductTypeElement(
        'tableNames',
        AlgebraicType.createArrayType(AlgebraicType.createStringType())
      ),
    ]);
  }

  export function serialize(writer: BinaryWriter, value: IdsToNames): void {
    IdsToNames.getTypeScriptAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): IdsToNames {
    return IdsToNames.getTypeScriptAlgebraicType().deserialize(reader);
  }
}

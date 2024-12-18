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
import { OneOffTable as __OneOffTable } from './one_off_table_type';

export type OneOffQueryResponse = {
  messageId: Uint8Array;
  error: string | undefined;
  tables: __OneOffTable[];
  totalHostExecutionDurationMicros: bigint;
};

/**
 * A namespace for generated helper functions.
 */
export namespace OneOffQueryResponse {
  /**
   * A function which returns this type represented as an AlgebraicType.
   * This function is derived from the AlgebraicType used to generate this type.
   */
  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        'messageId',
        AlgebraicType.createArrayType(AlgebraicType.createU8Type())
      ),
      new ProductTypeElement(
        'error',
        AlgebraicType.createOptionType(AlgebraicType.createStringType())
      ),
      new ProductTypeElement(
        'tables',
        AlgebraicType.createArrayType(
          __OneOffTable.getTypeScriptAlgebraicType()
        )
      ),
      new ProductTypeElement(
        'totalHostExecutionDurationMicros',
        AlgebraicType.createU64Type()
      ),
    ]);
  }

  export function serialize(
    writer: BinaryWriter,
    value: OneOffQueryResponse
  ): void {
    OneOffQueryResponse.getTypeScriptAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): OneOffQueryResponse {
    return OneOffQueryResponse.getTypeScriptAlgebraicType().deserialize(reader);
  }
}

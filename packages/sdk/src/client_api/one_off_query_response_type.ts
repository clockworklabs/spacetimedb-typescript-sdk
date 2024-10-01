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
import { OneOffTable as __OneOffTable } from "./one_off_table_type";

export type OneOffQueryResponse = {
  messageId: number[],
  error: string | undefined,
  tables: __OneOffTable[],
  totalHostExecutionDurationMicros: BigInt,
};

/**
 * A namespace for generated helper functions.
 */
export namespace OneOffQueryResponse {
  /**
  * A function which returns this type represented as an AlgebraicType.
  * This function is derived from the AlgebraicType used to generate this type.
  */
  export function getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement("message_id", AlgebraicType.createArrayType(AlgebraicType.createU8Type())),
      new ProductTypeElement("error", AlgebraicType.createOptionType(AlgebraicType.createStringType())),
      new ProductTypeElement("tables", AlgebraicType.createArrayType(__OneOffTable.getAlgebraicType())),
      new ProductTypeElement("total_host_execution_duration_micros", AlgebraicType.createU64Type()),
    ]);
  }

  export function serialize(writer: BinaryWriter, value: OneOffQueryResponse): void {
    const converted = {
      message_id: value.messageId,
      error: value.error,
      tables: value.tables,
      total_host_execution_duration_micros: value.totalHostExecutionDurationMicros,
    };
    OneOffQueryResponse.getAlgebraicType().serialize(writer, converted);
  }

  export function deserialize(reader: BinaryReader): OneOffQueryResponse {
    const value = OneOffQueryResponse.getAlgebraicType().deserialize(reader);
    return {
      messageId: value.message_id,
      error: value.error,
      tables: value.tables,
      totalHostExecutionDurationMicros: value.total_host_execution_duration_micros,
    };
  }

}



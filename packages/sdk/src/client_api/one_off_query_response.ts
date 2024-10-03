// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

import {
  AlgebraicType,
  ProductTypeElement,
  SumTypeVariant,
} from '../algebraic_type.ts';
import type { AlgebraicValue } from '../algebraic_value.ts';
import { OneOffTable } from './one_off_table.ts';

export class OneOffQueryResponse {
  static tableName = 'OneOffQueryResponse';
  messageId: Uint8Array;
  error: string | null;
  tables: OneOffTable[];
  totalHostExecutionDurationMicros: BigInt;

  static primaryKey: string | undefined = undefined;

  constructor(
    messageId: Uint8Array,
    error: string | null,
    tables: OneOffTable[],
    totalHostExecutionDurationMicros: BigInt
  ) {
    this.messageId = messageId;
    this.error = error;
    this.tables = tables;
    this.totalHostExecutionDurationMicros = totalHostExecutionDurationMicros;
  }

  static serialize(value: OneOffQueryResponse): object {
    return [
      Array.from(value.messageId),
      value.error ? { some: value.error } : { none: [] },
      value.tables.map(el => OneOffTable.serialize(el)),
      value.totalHostExecutionDurationMicros,
    ];
  }

  static getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement('messageId', AlgebraicType.createBytesType()),
      new ProductTypeElement(
        'error',
        AlgebraicType.createSumType([
          new SumTypeVariant('some', AlgebraicType.createStringType()),
          new SumTypeVariant('none', AlgebraicType.createProductType([])),
        ])
      ),
      new ProductTypeElement(
        'tables',
        AlgebraicType.createArrayType(OneOffTable.getTypeScriptAlgebraicType())
      ),
      new ProductTypeElement(
        'totalHostExecutionDurationMicros',
        AlgebraicType.createU64Type()
      ),
    ]);
  }

  static fromValue(value: AlgebraicValue): OneOffQueryResponse {
    let productValue = value.asProductValue();
    let __message_id = productValue.elements[0].asBytes();
    let __error =
      productValue.elements[1].asSumValue().tag == 1
        ? null
        : productValue.elements[1].asSumValue().value.asString();
    let __tables = productValue.elements[2]
      .asArray()
      .map(el => OneOffTable.fromValue(el)) as OneOffTable[];
    let __total_host_execution_duration_micros =
      productValue.elements[3].asBigInt();
    return new this(
      __message_id,
      __error,
      __tables,
      __total_host_execution_duration_micros
    );
  }
}

export default OneOffQueryResponse;

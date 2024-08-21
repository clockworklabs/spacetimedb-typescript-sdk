// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

import { AlgebraicType, ProductTypeElement } from '../algebraic_type.ts';
import type { AlgebraicValue } from '../algebraic_value.ts';
import { EncodedValue } from './encoded_value.ts';

export class OneOffTable {
  static tableName = 'OneOffTable';
  tableName: string;
  rows: EncodedValue[];

  static primaryKey: string | undefined = undefined;

  constructor(tableName: string, rows: EncodedValue[]) {
    this.tableName = tableName;
    this.rows = rows;
  }

  static serialize(value: OneOffTable): object {
    return [value.tableName, value.rows.map(el => EncodedValue.serialize(el))];
  }

  static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement('tableName', AlgebraicType.createStringType()),
      new ProductTypeElement(
        'rows',
        AlgebraicType.createArrayType(EncodedValue.getAlgebraicType())
      ),
    ]);
  }

  static fromValue(value: AlgebraicValue): OneOffTable {
    let productValue = value.asProductValue();
    let __table_name = productValue.elements[0].asString();
    let __rows = productValue.elements[1]
      .asArray()
      .map(el => EncodedValue.fromValue(el)) as EncodedValue[];
    return new this(__table_name, __rows);
  }
}

export default OneOffTable;

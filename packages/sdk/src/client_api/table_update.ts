// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import {
  AlgebraicType,
  AlgebraicValue,
  BuiltinType,
  ProductTypeElement,
} from '../index';
// @ts-ignore
import { EncodedValue } from './encoded_value';
// @ts-ignore

export class TableUpdate {
  static tableName = 'TableUpdate';
  tableId: number;
  tableName: string;
  deletes: EncodedValue[];
  inserts: EncodedValue[];

  static primaryKey: string | undefined = undefined;

  constructor(
    tableId: number,
    tableName: string,
    deletes: EncodedValue[],
    inserts: EncodedValue[]
  ) {
    this.tableId = tableId;
    this.tableName = tableName;
    this.deletes = deletes;
    this.inserts = inserts;
  }

  static serialize(value: TableUpdate): object {
    return [
      value.tableId,
      value.tableName,
      value.deletes.map(el => EncodedValue.serialize(el)),
      value.inserts.map(el => EncodedValue.serialize(el)),
    ];
  }

  static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        'tableId',
        AlgebraicType.createPrimitiveType(BuiltinType.Type.U32)
      ),
      new ProductTypeElement(
        'tableName',
        AlgebraicType.createPrimitiveType(BuiltinType.Type.String)
      ),
      new ProductTypeElement(
        'deletes',
        AlgebraicType.createArrayType(EncodedValue.getAlgebraicType())
      ),
      new ProductTypeElement(
        'inserts',
        AlgebraicType.createArrayType(EncodedValue.getAlgebraicType())
      ),
    ]);
  }

  static fromValue(value: AlgebraicValue): TableUpdate {
    let productValue = value.asProductValue();
    let __table_id = productValue.elements[0].asNumber();
    let __table_name = productValue.elements[1].asString();
    let __deletes = productValue.elements[2]
      .asArray()
      .map(el => EncodedValue.fromValue(el)) as EncodedValue[];
    let __inserts = productValue.elements[3]
      .asArray()
      .map(el => EncodedValue.fromValue(el)) as EncodedValue[];
    return new this(__table_id, __table_name, __deletes, __inserts);
  }
}

export default TableUpdate;

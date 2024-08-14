// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import {
  AlgebraicType,
  AlgebraicValue,
  BuiltinType,
  ProductTypeElement,
} from '../index';

export class OneOffQuery {
  static tableName = 'OneOffQuery';
  messageId: Uint8Array;
  queryString: string;

  static primaryKey: string | undefined = undefined;

  constructor(messageId: Uint8Array, queryString: string) {
    this.messageId = messageId;
    this.queryString = queryString;
  }

  static serialize(value: OneOffQuery): object {
    return [Array.from(value.messageId), value.queryString];
  }

  static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        'messageId',
        AlgebraicType.createArrayType(
          AlgebraicType.createPrimitiveType(BuiltinType.Type.U8)
        )
      ),
      new ProductTypeElement(
        'queryString',
        AlgebraicType.createPrimitiveType(BuiltinType.Type.String)
      ),
    ]);
  }

  static fromValue(value: AlgebraicValue): OneOffQuery {
    let productValue = value.asProductValue();
    let __message_id = productValue.elements[0].asBytes();
    let __query_string = productValue.elements[1].asString();
    return new this(__message_id, __query_string);
  }
}

export default OneOffQuery;

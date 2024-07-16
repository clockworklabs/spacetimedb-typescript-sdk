// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import {
  AlgebraicType,
  AlgebraicValue,
  BuiltinType,
  ProductTypeElement,
} from "../index";
// @ts-ignore
import { EncodedValue } from "./encoded_value";

export class CallReducer {
  static tableName = "CallReducer";
  reducer: string;
  args: EncodedValue;
  requestId: number;

  static primaryKey: string | undefined = undefined;

  constructor(reducer: string, args: EncodedValue, requestId: number) {
    this.reducer = reducer;
    this.args = args;
    this.requestId = requestId;
  }

  static serialize(value: CallReducer): object {
    return [value.reducer, EncodedValue.serialize(value.args), value.requestId];
  }

  static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        "reducer",
        AlgebraicType.createPrimitiveType(BuiltinType.Type.String)
      ),
      new ProductTypeElement("args", EncodedValue.getAlgebraicType()),
      new ProductTypeElement(
        "requestId",
        AlgebraicType.createPrimitiveType(BuiltinType.Type.U32)
      ),
    ]);
  }

  static fromValue(value: AlgebraicValue): CallReducer {
    let productValue = value.asProductValue();
    let __reducer = productValue.elements[0].asString();
    let __args = EncodedValue.fromValue(productValue.elements[1]);
    let __request_id = productValue.elements[2].asNumber();
    return new this(__reducer, __args, __request_id);
  }
}

export default CallReducer;

// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import {
  __SPACETIMEDB__,
  AlgebraicType,
  ProductType,
  ProductTypeElement,
  SumType,
  SumTypeVariant,
  DatabaseTable,
  AlgebraicValue,
  ReducerEvent,
  Identity,
  Address,
  ClientDB,
  SpacetimeDBClient,
} from "../index";
// @ts-ignore
import { EncodedValue } from "./encoded_value";

export class ReducerCallInfo {
  public static tableName = "ReducerCallInfo";
  public reducerName: string;
  public reducerId: number;
  public args: EncodedValue;
  public requestId: number;

  public static primaryKey: string | undefined = undefined;

  constructor(
    reducerName: string,
    reducerId: number,
    args: EncodedValue,
    requestId: number
  ) {
    this.reducerName = reducerName;
    this.reducerId = reducerId;
    this.args = args;
    this.requestId = requestId;
  }

  public static serialize(value: ReducerCallInfo): object {
    return [
      value.reducerName,
      value.reducerId,
      EncodedValue.serialize(value.args),
      value.requestId,
    ];
  }

  public static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement("reducerName", AlgebraicType.createStringType()),
      new ProductTypeElement("reducerId", AlgebraicType.createU32Type()),
      new ProductTypeElement("args", EncodedValue.getAlgebraicType()),
      new ProductTypeElement("requestId", AlgebraicType.createU32Type()),
    ]);
  }

  public static fromValue(value: AlgebraicValue): ReducerCallInfo {
    let productValue = value.asProductValue();
    let __reducer_name = productValue.elements[0].asString();
    let __reducer_id = productValue.elements[1].asNumber();
    let __args = EncodedValue.fromValue(productValue.elements[2]);
    let __request_id = productValue.elements[3].asNumber();
    return new this(__reducer_name, __reducer_id, __args, __request_id);
  }
}

export default ReducerCallInfo;
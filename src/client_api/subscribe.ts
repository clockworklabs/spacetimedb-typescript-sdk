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

export class Subscribe {
  public static tableName = "Subscribe";
  public queryStrings: string[];
  public requestId: number;

  public static primaryKey: string | undefined = undefined;

  constructor(queryStrings: string[], requestId: number) {
    this.queryStrings = queryStrings;
    this.requestId = requestId;
  }

  public static serialize(value: Subscribe): object {
    return [value.queryStrings, value.requestId];
  }

  public static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        "queryStrings",
        AlgebraicType.createArrayType(AlgebraicType.createStringType())
      ),
      new ProductTypeElement("requestId", AlgebraicType.createU32Type()),
    ]);
  }

  public static fromValue(value: AlgebraicValue): Subscribe {
    let productValue = value.asProductValue();
    let __query_strings = productValue.elements[0]
      .asArray()
      .map((el) => el.asString()) as string[];
    let __request_id = productValue.elements[1].asNumber();
    return new this(__query_strings, __request_id);
  }
}

export default Subscribe;
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

export class EnergyQuanta {
  public static tableName = "EnergyQuanta";
  public quanta: BigInt;

  public static primaryKey: string | undefined = undefined;

  constructor(quanta: BigInt) {
    this.quanta = quanta;
  }

  public static serialize(value: EnergyQuanta): object {
    return [value.quanta];
  }

  public static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement("quanta", AlgebraicType.createU128Type()),
    ]);
  }

  public static fromValue(value: AlgebraicValue): EnergyQuanta {
    let productValue = value.asProductValue();
    let __quanta = productValue.elements[0].asBigInt();
    return new this(__quanta);
  }
}

export default EnergyQuanta;
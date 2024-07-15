// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import {
  __SPACETIMEDB__,
  AlgebraicType,
  ProductType,
  BuiltinType,
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
import { DatabaseUpdate } from "./database_update";

export class InitialSubscription {
  public static tableName = "InitialSubscription";
  public databaseUpdate: DatabaseUpdate;
  public requestId: number;
  public totalHostExecutionDurationMicros: BigInt;

  public static primaryKey: string | undefined = undefined;

  constructor(
    databaseUpdate: DatabaseUpdate,
    requestId: number,
    totalHostExecutionDurationMicros: BigInt
  ) {
    this.databaseUpdate = databaseUpdate;
    this.requestId = requestId;
    this.totalHostExecutionDurationMicros = totalHostExecutionDurationMicros;
  }

  public static serialize(value: InitialSubscription): object {
    return [
      DatabaseUpdate.serialize(value.databaseUpdate),
      value.requestId,
      value.totalHostExecutionDurationMicros,
    ];
  }

  public static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        "databaseUpdate",
        DatabaseUpdate.getAlgebraicType()
      ),
      new ProductTypeElement(
        "requestId",
        AlgebraicType.createPrimitiveType(BuiltinType.Type.U32)
      ),
      new ProductTypeElement(
        "totalHostExecutionDurationMicros",
        AlgebraicType.createPrimitiveType(BuiltinType.Type.U64)
      ),
    ]);
  }

  public static fromValue(value: AlgebraicValue): InitialSubscription {
    let productValue = value.asProductValue();
    let __database_update = DatabaseUpdate.fromValue(productValue.elements[0]);
    let __request_id = productValue.elements[1].asNumber();
    let __total_host_execution_duration_micros =
      productValue.elements[2].asBigInt();
    return new this(
      __database_update,
      __request_id,
      __total_host_execution_duration_micros
    );
  }
}

export default InitialSubscription;

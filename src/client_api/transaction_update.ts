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
import { UpdateStatus } from "./update_status";
// @ts-ignore
import { Timestamp } from "./timestamp";
// @ts-ignore
import { ReducerCallInfo } from "./reducer_call_info";
// @ts-ignore
import { EnergyQuanta } from "./energy_quanta";

export class TransactionUpdate {
  public static tableName = "TransactionUpdate";
  public status: UpdateStatus;
  public timestamp: Timestamp;
  public callerIdentity: Identity;
  public callerAddress: Address;
  public reducerCall: ReducerCallInfo;
  public energyQuantaUsed: EnergyQuanta;
  public hostExecutionDurationMicros: BigInt;

  public static primaryKey: string | undefined = undefined;

  constructor(
    status: UpdateStatus,
    timestamp: Timestamp,
    callerIdentity: Identity,
    callerAddress: Address,
    reducerCall: ReducerCallInfo,
    energyQuantaUsed: EnergyQuanta,
    hostExecutionDurationMicros: BigInt
  ) {
    this.status = status;
    this.timestamp = timestamp;
    this.callerIdentity = callerIdentity;
    this.callerAddress = callerAddress;
    this.reducerCall = reducerCall;
    this.energyQuantaUsed = energyQuantaUsed;
    this.hostExecutionDurationMicros = hostExecutionDurationMicros;
  }

  public static serialize(value: TransactionUpdate): object {
    return [
      UpdateStatus.serialize(value.status),
      Timestamp.serialize(value.timestamp),
      Array.from(value.callerIdentity.toUint8Array()),
      Array.from(value.callerAddress.toUint8Array()),
      ReducerCallInfo.serialize(value.reducerCall),
      EnergyQuanta.serialize(value.energyQuantaUsed),
      value.hostExecutionDurationMicros,
    ];
  }

  public static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement("status", UpdateStatus.getAlgebraicType()),
      new ProductTypeElement("timestamp", Timestamp.getAlgebraicType()),
      new ProductTypeElement(
        "callerIdentity",
        AlgebraicType.createProductType([
          new ProductTypeElement(
            "__identity_bytes",
            AlgebraicType.createBytesType()
          ),
        ])
      ),
      new ProductTypeElement(
        "callerAddress",
        AlgebraicType.createProductType([
          new ProductTypeElement(
            "__address_bytes",
            AlgebraicType.createBytesType()
          ),
        ])
      ),
      new ProductTypeElement("reducerCall", ReducerCallInfo.getAlgebraicType()),
      new ProductTypeElement(
        "energyQuantaUsed",
        EnergyQuanta.getAlgebraicType()
      ),
      new ProductTypeElement(
        "hostExecutionDurationMicros",
        AlgebraicType.createU64Type()
      ),
    ]);
  }

  public static fromValue(value: AlgebraicValue): TransactionUpdate {
    let productValue = value.asProductValue();
    let __status = UpdateStatus.fromValue(productValue.elements[0]);
    let __timestamp = Timestamp.fromValue(productValue.elements[1]);
    let __caller_identity = productValue.elements[2].asIdentity();
    let __caller_address = productValue.elements[3].asAddress();
    let __reducer_call = ReducerCallInfo.fromValue(productValue.elements[4]);
    let __energy_quanta_used = EnergyQuanta.fromValue(productValue.elements[5]);
    let __host_execution_duration_micros = productValue.elements[6].asBigInt();
    return new this(
      __status,
      __timestamp,
      __caller_identity,
      __caller_address,
      __reducer_call,
      __energy_quanta_used,
      __host_execution_duration_micros
    );
  }
}

export default TransactionUpdate;

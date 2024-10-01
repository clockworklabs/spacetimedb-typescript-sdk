// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

import {
  // @ts-ignore
  Address,
  // @ts-ignore
  AlgebraicType,
  // @ts-ignore
  AlgebraicValue,
  // @ts-ignore
  BinaryReader,
  // @ts-ignore
  BinaryWriter,
  // @ts-ignore
  DBConnectionBuilder,
  // @ts-ignore
  DBConnectionImpl,
  // @ts-ignore
  DBContext,
  // @ts-ignore
  Event,
  // @ts-ignore
  EventContext,
  // @ts-ignore
  Identity,
  // @ts-ignore
  ProductType,
  // @ts-ignore
  ProductTypeElement,
  // @ts-ignore
  SumType,
  // @ts-ignore
  SumTypeVariant,
  // @ts-ignore
  TableCache,
} from "../index";
// @ts-ignore
import { UpdateStatus as __UpdateStatus } from "./update_status_type";
// @ts-ignore
import { Timestamp as __Timestamp } from "./timestamp_type";
// @ts-ignore
import { ReducerCallInfo as __ReducerCallInfo } from "./reducer_call_info_type";
// @ts-ignore
import { EnergyQuanta as __EnergyQuanta } from "./energy_quanta_type";

export type TransactionUpdate = {
  status: __UpdateStatus,
  timestamp: __Timestamp,
  callerIdentity: Identity,
  callerAddress: Address,
  reducerCall: __ReducerCallInfo,
  energyQuantaUsed: __EnergyQuanta,
  hostExecutionDurationMicros: BigInt,
};

/**
 * A namespace for generated helper functions.
 */
export namespace TransactionUpdate {
  /**
  * A function which returns this type represented as an AlgebraicType.
  * This function is derived from the AlgebraicType used to generate this type.
  */
  export function getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement("status", __UpdateStatus.getAlgebraicType()),
      new ProductTypeElement("timestamp", __Timestamp.getAlgebraicType()),
      new ProductTypeElement("caller_identity", AlgebraicType.createIdentityType()),
      new ProductTypeElement("caller_address", AlgebraicType.createAddressType()),
      new ProductTypeElement("reducer_call", __ReducerCallInfo.getAlgebraicType()),
      new ProductTypeElement("energy_quanta_used", __EnergyQuanta.getAlgebraicType()),
      new ProductTypeElement("host_execution_duration_micros", AlgebraicType.createU64Type()),
    ]);
  }

  export function serialize(writer: BinaryWriter, value: TransactionUpdate): void {
    const converted = {
      status: value.status,
      timestamp: value.timestamp,
      caller_identity: value.callerIdentity,
      caller_address: value.callerAddress,
      reducer_call: value.reducerCall,
      energy_quanta_used: value.energyQuantaUsed,
      host_execution_duration_micros: value.hostExecutionDurationMicros,
    };
    TransactionUpdate.getAlgebraicType().serialize(writer, converted);
  }

  export function deserialize(reader: BinaryReader): TransactionUpdate {
    const value = TransactionUpdate.getAlgebraicType().deserialize(reader);
    return {
      status: value.status,
      timestamp: value.timestamp,
      callerIdentity: value.caller_identity,
      callerAddress: value.caller_address,
      reducerCall: value.reducer_call,
      energyQuantaUsed: value.energy_quanta_used,
      hostExecutionDurationMicros: value.host_execution_duration_micros,
    };
  }

}



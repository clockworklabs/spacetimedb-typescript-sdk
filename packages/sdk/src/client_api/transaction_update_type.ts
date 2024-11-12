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
  CallReducerFlags,
  // @ts-ignore
  DBConnectionBuilder,
  // @ts-ignore
  DBConnectionImpl,
  // @ts-ignore
  DBContext,
  // @ts-ignore
  Event,
  // @ts-ignore
  EventContextInterface,
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
  // @ts-ignore
  deepEqual,
} from '..';
// @ts-ignore
import { UpdateStatus as __UpdateStatus } from './update_status_type';
// @ts-ignore
import { Timestamp as __Timestamp } from './timestamp_type';
// @ts-ignore
import { ReducerCallInfo as __ReducerCallInfo } from './reducer_call_info_type';
// @ts-ignore
import { EnergyQuanta as __EnergyQuanta } from './energy_quanta_type';

export type TransactionUpdate = {
  status: __UpdateStatus;
  timestamp: __Timestamp;
  callerIdentity: Identity;
  callerAddress: Address;
  reducerCall: __ReducerCallInfo;
  energyQuantaUsed: __EnergyQuanta;
  hostExecutionDurationMicros: bigint;
};

/**
 * A namespace for generated helper functions.
 */
export namespace TransactionUpdate {
  /**
   * A function which returns this type represented as an AlgebraicType.
   * This function is derived from the AlgebraicType used to generate this type.
   */
  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        'status',
        __UpdateStatus.getTypeScriptAlgebraicType()
      ),
      new ProductTypeElement(
        'timestamp',
        __Timestamp.getTypeScriptAlgebraicType()
      ),
      new ProductTypeElement(
        'callerIdentity',
        AlgebraicType.createIdentityType()
      ),
      new ProductTypeElement(
        'callerAddress',
        AlgebraicType.createAddressType()
      ),
      new ProductTypeElement(
        'reducerCall',
        __ReducerCallInfo.getTypeScriptAlgebraicType()
      ),
      new ProductTypeElement(
        'energyQuantaUsed',
        __EnergyQuanta.getTypeScriptAlgebraicType()
      ),
      new ProductTypeElement(
        'hostExecutionDurationMicros',
        AlgebraicType.createU64Type()
      ),
    ]);
  }

  export function serialize(
    writer: BinaryWriter,
    value: TransactionUpdate
  ): void {
    TransactionUpdate.getTypeScriptAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): TransactionUpdate {
    return TransactionUpdate.getTypeScriptAlgebraicType().deserialize(reader);
  }
}

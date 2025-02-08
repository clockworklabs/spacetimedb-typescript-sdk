// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN YOUR MODULE SOURCE CODE INSTEAD.

/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import {
  Address,
  AlgebraicType,
  AlgebraicValue,
  BinaryReader,
  BinaryWriter,
  CallReducerFlags,
  DBConnectionBuilder,
  DBConnectionImpl,
  DBContext,
  ErrorContextInterface,
  Event,
  EventContextInterface,
  Identity,
  ProductType,
  ProductTypeElement,
  ReducerEventContextInterface,
  SubscriptionBuilderImpl,
  SubscriptionEventContextInterface,
  SumType,
  SumTypeVariant,
  TableCache,
  TimeDuration,
  Timestamp,
  deepEqual,
} from '../index';
import { UpdateStatus as __UpdateStatus } from './update_status_type';
import { ReducerCallInfo as __ReducerCallInfo } from './reducer_call_info_type';
import { EnergyQuanta as __EnergyQuanta } from './energy_quanta_type';

export type TransactionUpdate = {
  status: __UpdateStatus;
  timestamp: Timestamp;
  callerIdentity: Identity;
  callerAddress: Address;
  reducerCall: __ReducerCallInfo;
  energyQuantaUsed: __EnergyQuanta;
  totalHostExecutionDuration: TimeDuration;
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
      new ProductTypeElement('timestamp', AlgebraicType.createTimestampType()),
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
        'totalHostExecutionDuration',
        AlgebraicType.createTimeDurationType()
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

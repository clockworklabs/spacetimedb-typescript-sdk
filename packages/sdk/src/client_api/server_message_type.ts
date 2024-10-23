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
import { InitialSubscription as __InitialSubscription } from './initial_subscription_type';
// @ts-ignore
import { TransactionUpdate as __TransactionUpdate } from './transaction_update_type';
// @ts-ignore
import { TransactionUpdateLight as __TransactionUpdateLight } from './transaction_update_light_type';
// @ts-ignore
import { AfterConnecting as __AfterConnecting } from './after_connecting_type';
// @ts-ignore
import { OneOffQueryResponse as __OneOffQueryResponse } from './one_off_query_response_type';

// A namespace for generated variants and helper functions.
export namespace ServerMessage {
  // These are the generated variant types for each variant of the tagged union.
  // One type is generated per variant and will be used in the `value` field of
  // the tagged union.
  export type InitialSubscription = {
    tag: 'InitialSubscription';
    value: __InitialSubscription;
  };
  export type TransactionUpdate = {
    tag: 'TransactionUpdate';
    value: __TransactionUpdate;
  };
  export type TransactionUpdateLight = {
    tag: 'TransactionUpdateLight';
    value: __TransactionUpdateLight;
  };
  export type AfterConnecting = {
    tag: 'AfterConnecting';
    value: __AfterConnecting;
  };
  export type OneOffQueryResponse = {
    tag: 'OneOffQueryResponse';
    value: __OneOffQueryResponse;
  };

  // Helper functions for constructing each variant of the tagged union.
  // ```
  // const foo = Foo.A(42);
  // assert!(foo.tag === "A");
  // assert!(foo.value === 42);
  // ```
  export const InitialSubscription = (
    value: __InitialSubscription
  ): ServerMessage => ({ tag: 'InitialSubscription', value });
  export const TransactionUpdate = (
    value: __TransactionUpdate
  ): ServerMessage => ({ tag: 'TransactionUpdate', value });
  export const TransactionUpdateLight = (
    value: __TransactionUpdateLight
  ): ServerMessage => ({ tag: 'TransactionUpdateLight', value });
  export const AfterConnecting = (value: __AfterConnecting): ServerMessage => ({
    tag: 'AfterConnecting',
    value,
  });
  export const OneOffQueryResponse = (
    value: __OneOffQueryResponse
  ): ServerMessage => ({ tag: 'OneOffQueryResponse', value });

  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createSumType([
      new SumTypeVariant(
        'InitialSubscription',
        __InitialSubscription.getTypeScriptAlgebraicType()
      ),
      new SumTypeVariant(
        'TransactionUpdate',
        __TransactionUpdate.getTypeScriptAlgebraicType()
      ),
      new SumTypeVariant(
        'TransactionUpdateLight',
        __TransactionUpdateLight.getTypeScriptAlgebraicType()
      ),
      new SumTypeVariant(
        'AfterConnecting',
        __AfterConnecting.getTypeScriptAlgebraicType()
      ),
      new SumTypeVariant(
        'OneOffQueryResponse',
        __OneOffQueryResponse.getTypeScriptAlgebraicType()
      ),
    ]);
  }

  export function serialize(writer: BinaryWriter, value: ServerMessage): void {
    ServerMessage.getTypeScriptAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): ServerMessage {
    return ServerMessage.getTypeScriptAlgebraicType().deserialize(reader);
  }
}

// The tagged union or sum type for the algebraic type `ServerMessage`.
export type ServerMessage =
  | ServerMessage.InitialSubscription
  | ServerMessage.TransactionUpdate
  | ServerMessage.TransactionUpdateLight
  | ServerMessage.AfterConnecting
  | ServerMessage.OneOffQueryResponse;

export default ServerMessage;

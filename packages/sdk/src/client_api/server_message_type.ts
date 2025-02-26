// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN YOUR MODULE SOURCE CODE INSTEAD.

/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import {
  AlgebraicType,
  AlgebraicValue,
  BinaryReader,
  BinaryWriter,
  CallReducerFlags,
  ConnectionId,
  DbConnectionBuilder,
  DbConnectionImpl,
  DbContext,
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
import { InitialSubscription as __InitialSubscription } from './initial_subscription_type';
import { TransactionUpdate as __TransactionUpdate } from './transaction_update_type';
import { TransactionUpdateLight as __TransactionUpdateLight } from './transaction_update_light_type';
import { IdentityToken as __IdentityToken } from './identity_token_type';
import { OneOffQueryResponse as __OneOffQueryResponse } from './one_off_query_response_type';
import { SubscribeApplied as __SubscribeApplied } from './subscribe_applied_type';
import { UnsubscribeApplied as __UnsubscribeApplied } from './unsubscribe_applied_type';
import { SubscriptionError as __SubscriptionError } from './subscription_error_type';
import { SubscribeMultiApplied as __SubscribeMultiApplied } from './subscribe_multi_applied_type';
import { UnsubscribeMultiApplied as __UnsubscribeMultiApplied } from './unsubscribe_multi_applied_type';

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
  export type IdentityToken = { tag: 'IdentityToken'; value: __IdentityToken };
  export type OneOffQueryResponse = {
    tag: 'OneOffQueryResponse';
    value: __OneOffQueryResponse;
  };
  export type SubscribeApplied = {
    tag: 'SubscribeApplied';
    value: __SubscribeApplied;
  };
  export type UnsubscribeApplied = {
    tag: 'UnsubscribeApplied';
    value: __UnsubscribeApplied;
  };
  export type SubscriptionError = {
    tag: 'SubscriptionError';
    value: __SubscriptionError;
  };
  export type SubscribeMultiApplied = {
    tag: 'SubscribeMultiApplied';
    value: __SubscribeMultiApplied;
  };
  export type UnsubscribeMultiApplied = {
    tag: 'UnsubscribeMultiApplied';
    value: __UnsubscribeMultiApplied;
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
  export const IdentityToken = (value: __IdentityToken): ServerMessage => ({
    tag: 'IdentityToken',
    value,
  });
  export const OneOffQueryResponse = (
    value: __OneOffQueryResponse
  ): ServerMessage => ({ tag: 'OneOffQueryResponse', value });
  export const SubscribeApplied = (
    value: __SubscribeApplied
  ): ServerMessage => ({ tag: 'SubscribeApplied', value });
  export const UnsubscribeApplied = (
    value: __UnsubscribeApplied
  ): ServerMessage => ({ tag: 'UnsubscribeApplied', value });
  export const SubscriptionError = (
    value: __SubscriptionError
  ): ServerMessage => ({ tag: 'SubscriptionError', value });
  export const SubscribeMultiApplied = (
    value: __SubscribeMultiApplied
  ): ServerMessage => ({ tag: 'SubscribeMultiApplied', value });
  export const UnsubscribeMultiApplied = (
    value: __UnsubscribeMultiApplied
  ): ServerMessage => ({ tag: 'UnsubscribeMultiApplied', value });

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
        'IdentityToken',
        __IdentityToken.getTypeScriptAlgebraicType()
      ),
      new SumTypeVariant(
        'OneOffQueryResponse',
        __OneOffQueryResponse.getTypeScriptAlgebraicType()
      ),
      new SumTypeVariant(
        'SubscribeApplied',
        __SubscribeApplied.getTypeScriptAlgebraicType()
      ),
      new SumTypeVariant(
        'UnsubscribeApplied',
        __UnsubscribeApplied.getTypeScriptAlgebraicType()
      ),
      new SumTypeVariant(
        'SubscriptionError',
        __SubscriptionError.getTypeScriptAlgebraicType()
      ),
      new SumTypeVariant(
        'SubscribeMultiApplied',
        __SubscribeMultiApplied.getTypeScriptAlgebraicType()
      ),
      new SumTypeVariant(
        'UnsubscribeMultiApplied',
        __UnsubscribeMultiApplied.getTypeScriptAlgebraicType()
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
  | ServerMessage.IdentityToken
  | ServerMessage.OneOffQueryResponse
  | ServerMessage.SubscribeApplied
  | ServerMessage.UnsubscribeApplied
  | ServerMessage.SubscriptionError
  | ServerMessage.SubscribeMultiApplied
  | ServerMessage.UnsubscribeMultiApplied;

export default ServerMessage;

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
import { CallReducer as __CallReducer } from './call_reducer_type';
import { Subscribe as __Subscribe } from './subscribe_type';
import { OneOffQuery as __OneOffQuery } from './one_off_query_type';
import { SubscribeSingle as __SubscribeSingle } from './subscribe_single_type';
import { SubscribeMulti as __SubscribeMulti } from './subscribe_multi_type';
import { Unsubscribe as __Unsubscribe } from './unsubscribe_type';
import { UnsubscribeMulti as __UnsubscribeMulti } from './unsubscribe_multi_type';

// A namespace for generated variants and helper functions.
export namespace ClientMessage {
  // These are the generated variant types for each variant of the tagged union.
  // One type is generated per variant and will be used in the `value` field of
  // the tagged union.
  export type CallReducer = { tag: 'CallReducer'; value: __CallReducer };
  export type Subscribe = { tag: 'Subscribe'; value: __Subscribe };
  export type OneOffQuery = { tag: 'OneOffQuery'; value: __OneOffQuery };
  export type SubscribeSingle = {
    tag: 'SubscribeSingle';
    value: __SubscribeSingle;
  };
  export type SubscribeMulti = {
    tag: 'SubscribeMulti';
    value: __SubscribeMulti;
  };
  export type Unsubscribe = { tag: 'Unsubscribe'; value: __Unsubscribe };
  export type UnsubscribeMulti = {
    tag: 'UnsubscribeMulti';
    value: __UnsubscribeMulti;
  };

  // Helper functions for constructing each variant of the tagged union.
  // ```
  // const foo = Foo.A(42);
  // assert!(foo.tag === "A");
  // assert!(foo.value === 42);
  // ```
  export const CallReducer = (value: __CallReducer): ClientMessage => ({
    tag: 'CallReducer',
    value,
  });
  export const Subscribe = (value: __Subscribe): ClientMessage => ({
    tag: 'Subscribe',
    value,
  });
  export const OneOffQuery = (value: __OneOffQuery): ClientMessage => ({
    tag: 'OneOffQuery',
    value,
  });
  export const SubscribeSingle = (value: __SubscribeSingle): ClientMessage => ({
    tag: 'SubscribeSingle',
    value,
  });
  export const SubscribeMulti = (value: __SubscribeMulti): ClientMessage => ({
    tag: 'SubscribeMulti',
    value,
  });
  export const Unsubscribe = (value: __Unsubscribe): ClientMessage => ({
    tag: 'Unsubscribe',
    value,
  });
  export const UnsubscribeMulti = (
    value: __UnsubscribeMulti
  ): ClientMessage => ({ tag: 'UnsubscribeMulti', value });

  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createSumType([
      new SumTypeVariant(
        'CallReducer',
        __CallReducer.getTypeScriptAlgebraicType()
      ),
      new SumTypeVariant('Subscribe', __Subscribe.getTypeScriptAlgebraicType()),
      new SumTypeVariant(
        'OneOffQuery',
        __OneOffQuery.getTypeScriptAlgebraicType()
      ),
      new SumTypeVariant(
        'SubscribeSingle',
        __SubscribeSingle.getTypeScriptAlgebraicType()
      ),
      new SumTypeVariant(
        'SubscribeMulti',
        __SubscribeMulti.getTypeScriptAlgebraicType()
      ),
      new SumTypeVariant(
        'Unsubscribe',
        __Unsubscribe.getTypeScriptAlgebraicType()
      ),
      new SumTypeVariant(
        'UnsubscribeMulti',
        __UnsubscribeMulti.getTypeScriptAlgebraicType()
      ),
    ]);
  }

  export function serialize(writer: BinaryWriter, value: ClientMessage): void {
    ClientMessage.getTypeScriptAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): ClientMessage {
    return ClientMessage.getTypeScriptAlgebraicType().deserialize(reader);
  }
}

// The tagged union or sum type for the algebraic type `ClientMessage`.
export type ClientMessage =
  | ClientMessage.CallReducer
  | ClientMessage.Subscribe
  | ClientMessage.OneOffQuery
  | ClientMessage.SubscribeSingle
  | ClientMessage.SubscribeMulti
  | ClientMessage.Unsubscribe
  | ClientMessage.UnsubscribeMulti;

export default ClientMessage;

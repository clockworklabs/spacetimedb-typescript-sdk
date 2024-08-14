// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import { AlgebraicType, AlgebraicValue, SumTypeVariant } from '../index';
// @ts-ignore
import { InitialSubscription as __InitialSubscription } from './initial_subscription';
// @ts-ignore
import { TransactionUpdate as __TransactionUpdate } from './transaction_update';
// @ts-ignore
import { IdentityToken as __IdentityToken } from './identity_token';
// @ts-ignore
import { OneOffQueryResponse as __OneOffQueryResponse } from './one_off_query_response';

export namespace ServerMessage {
  export function getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createSumType([
      new SumTypeVariant(
        'InitialSubscription',
        __InitialSubscription.getAlgebraicType()
      ),
      new SumTypeVariant(
        'TransactionUpdate',
        __TransactionUpdate.getAlgebraicType()
      ),
      new SumTypeVariant('IdentityToken', __IdentityToken.getAlgebraicType()),
      new SumTypeVariant(
        'OneOffQueryResponse',
        __OneOffQueryResponse.getAlgebraicType()
      ),
    ]);
  }

  export function serialize(value: ServerMessage): object {
    switch (value.tag) {
      case 'InitialSubscription':
        return {
          InitialSubscription: __InitialSubscription.serialize(value.value),
        };
      case 'TransactionUpdate':
        return {
          TransactionUpdate: __TransactionUpdate.serialize(value.value),
        };
      case 'IdentityToken':
        return { IdentityToken: __IdentityToken.serialize(value.value) };
      case 'OneOffQueryResponse':
        return {
          OneOffQueryResponse: __OneOffQueryResponse.serialize(value.value),
        };
      default:
        throw 'unreachable';
    }
  }

  export type InitialSubscription = {
    tag: 'InitialSubscription';
    value: __InitialSubscription;
  };
  export const InitialSubscription = (
    value: __InitialSubscription
  ): InitialSubscription => ({ tag: 'InitialSubscription', value });
  export type TransactionUpdate = {
    tag: 'TransactionUpdate';
    value: __TransactionUpdate;
  };
  export const TransactionUpdate = (
    value: __TransactionUpdate
  ): TransactionUpdate => ({ tag: 'TransactionUpdate', value });
  export type IdentityToken = { tag: 'IdentityToken'; value: __IdentityToken };
  export const IdentityToken = (value: __IdentityToken): IdentityToken => ({
    tag: 'IdentityToken',
    value,
  });
  export type OneOffQueryResponse = {
    tag: 'OneOffQueryResponse';
    value: __OneOffQueryResponse;
  };
  export const OneOffQueryResponse = (
    value: __OneOffQueryResponse
  ): OneOffQueryResponse => ({ tag: 'OneOffQueryResponse', value });

  export function fromValue(value: AlgebraicValue): ServerMessage {
    let sumValue = value.asSumValue();
    switch (sumValue.tag) {
      case 0:
        return {
          tag: 'InitialSubscription',
          value: __InitialSubscription.fromValue(sumValue.value),
        };
      case 1:
        return {
          tag: 'TransactionUpdate',
          value: __TransactionUpdate.fromValue(sumValue.value),
        };
      case 2:
        return {
          tag: 'IdentityToken',
          value: __IdentityToken.fromValue(sumValue.value),
        };
      case 3:
        return {
          tag: 'OneOffQueryResponse',
          value: __OneOffQueryResponse.fromValue(sumValue.value),
        };
      default:
        throw 'unreachable';
    }
  }
}

export type ServerMessage =
  | ServerMessage.InitialSubscription
  | ServerMessage.TransactionUpdate
  | ServerMessage.IdentityToken
  | ServerMessage.OneOffQueryResponse;
export default ServerMessage;

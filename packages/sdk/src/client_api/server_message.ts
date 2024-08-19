import { AlgebraicType, SumTypeVariant } from '../algebraic_type.ts';
import type { AlgebraicValue } from '../algebraic_value.ts';
import { IdentityToken } from './identity_token.ts';
import { InitialSubscription } from './initial_subscription.ts';
import { OneOffQueryResponse } from './one_off_query_response.ts';
import { TransactionUpdate } from './transaction_update.ts';

export class ServerMessage {
  constructor(
    public tag:
      | 'InitialSubscription'
      | 'TransactionUpdate'
      | 'IdentityToken'
      | 'OneOffQueryResponse',
    public value:
      | InitialSubscription
      | TransactionUpdate
      | IdentityToken
      | OneOffQueryResponse
  ) {}

  static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createSumType([
      new SumTypeVariant(
        'InitialSubscription',
        InitialSubscription.getAlgebraicType()
      ),
      new SumTypeVariant(
        'TransactionUpdate',
        TransactionUpdate.getAlgebraicType()
      ),
      new SumTypeVariant('IdentityToken', IdentityToken.getAlgebraicType()),
      new SumTypeVariant(
        'OneOffQueryResponse',
        OneOffQueryResponse.getAlgebraicType()
      ),
    ]);
  }

  static serialize(value: ServerMessage): object {
    switch (value.tag) {
      case 'InitialSubscription':
        return {
          InitialSubscription: InitialSubscription.serialize(
            value.value as InitialSubscription
          ),
        };
      case 'TransactionUpdate':
        return {
          TransactionUpdate: TransactionUpdate.serialize(
            value.value as TransactionUpdate
          ),
        };
      case 'IdentityToken':
        return {
          IdentityToken: IdentityToken.serialize(value.value as IdentityToken),
        };
      case 'OneOffQueryResponse':
        return {
          OneOffQueryResponse: OneOffQueryResponse.serialize(
            value.value as OneOffQueryResponse
          ),
        };
      default:
        throw 'unreachable';
    }
  }

  static fromValue(value: AlgebraicValue): ServerMessage {
    let sumValue = value.asSumValue();
    switch (sumValue.tag) {
      case 0:
        return new ServerMessage(
          'InitialSubscription',
          InitialSubscription.fromValue(sumValue.value)
        );
      case 1:
        return new ServerMessage(
          'TransactionUpdate',
          TransactionUpdate.fromValue(sumValue.value)
        );
      case 2:
        return new ServerMessage(
          'IdentityToken',
          IdentityToken.fromValue(sumValue.value)
        );
      case 3:
        return new ServerMessage(
          'OneOffQueryResponse',
          OneOffQueryResponse.fromValue(sumValue.value)
        );
      default:
        throw 'unreachable';
    }
  }

  static InitialSubscription(value: InitialSubscription): ServerMessage {
    return new ServerMessage('InitialSubscription', value);
  }

  static TransactionUpdate(value: TransactionUpdate): ServerMessage {
    return new ServerMessage('TransactionUpdate', value);
  }

  static IdentityToken(value: IdentityToken): ServerMessage {
    return new ServerMessage('IdentityToken', value);
  }

  static OneOffQueryResponse(value: OneOffQueryResponse): ServerMessage {
    return new ServerMessage('OneOffQueryResponse', value);
  }
}

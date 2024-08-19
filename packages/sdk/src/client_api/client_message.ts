import { AlgebraicType, SumTypeVariant } from '../algebraic_type.ts';
import type { AlgebraicValue } from '../algebraic_value.ts';
import { CallReducer } from './call_reducer.ts';
import { OneOffQuery } from './one_off_query.ts';
import { Subscribe } from './subscribe.ts';

export class ClientMessage {
  constructor(
    public tag: 'CallReducer' | 'Subscribe' | 'OneOffQuery',
    public value: CallReducer | Subscribe | OneOffQuery
  ) {}

  static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createSumType([
      new SumTypeVariant('CallReducer', CallReducer.getAlgebraicType()),
      new SumTypeVariant('Subscribe', Subscribe.getAlgebraicType()),
      new SumTypeVariant('OneOffQuery', OneOffQuery.getAlgebraicType()),
    ]);
  }

  static serialize(value: ClientMessage): object {
    switch (value.tag) {
      case 'CallReducer':
        return {
          CallReducer: CallReducer.serialize(value.value as CallReducer),
        };
      case 'Subscribe':
        return { Subscribe: Subscribe.serialize(value.value as Subscribe) };
      case 'OneOffQuery':
        return {
          OneOffQuery: OneOffQuery.serialize(value.value as OneOffQuery),
        };
      default:
        throw 'unreachable';
    }
  }

  static fromValue(value: AlgebraicValue): ClientMessage {
    let sumValue = value.asSumValue();
    switch (sumValue.tag) {
      case 0:
        return new ClientMessage(
          'CallReducer',
          CallReducer.fromValue(sumValue.value)
        );
      case 1:
        return new ClientMessage(
          'Subscribe',
          Subscribe.fromValue(sumValue.value)
        );
      case 2:
        return new ClientMessage(
          'OneOffQuery',
          OneOffQuery.fromValue(sumValue.value)
        );
      default:
        throw 'unreachable';
    }
  }

  static CallReducer(value: CallReducer): ClientMessage {
    return new ClientMessage('CallReducer', value);
  }
  static Subscribe(value: Subscribe): ClientMessage {
    return new ClientMessage('Subscribe', value);
  }
  static OneOffQuery(value: OneOffQuery): ClientMessage {
    return new ClientMessage('OneOffQuery', value);
  }
}

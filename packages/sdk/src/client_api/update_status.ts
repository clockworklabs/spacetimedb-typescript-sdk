import {
  AlgebraicType,
  BuiltinType,
  SumTypeVariant,
} from '../algebraic_type.ts';
import type { AlgebraicValue } from '../algebraic_value.ts';
import { DatabaseUpdate } from './database_update.ts';

export class UpdateStatus {
  constructor(
    public tag: 'Committed' | 'Failed' | 'OutOfEnergy',
    public value: DatabaseUpdate | string | undefined
  ) {
    this.tag = tag;
    this.value = value;
  }

  static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createSumType([
      new SumTypeVariant('Committed', DatabaseUpdate.getAlgebraicType()),
      new SumTypeVariant(
        'Failed',
        AlgebraicType.createPrimitiveType(BuiltinType.Type.String)
      ),
      new SumTypeVariant('OutOfEnergy', AlgebraicType.createProductType([])),
    ]);
  }

  static serialize(value: UpdateStatus): object {
    switch (value.tag) {
      case 'Committed':
        return {
          Committed: DatabaseUpdate.serialize(value.value as DatabaseUpdate),
        };
      case 'Failed':
        return { Failed: value.value };
      case 'OutOfEnergy':
        return { OutOfEnergy: [] };
      default:
        throw 'unreachable';
    }
  }

  static fromValue(value: AlgebraicValue): UpdateStatus {
    let sumValue = value.asSumValue();
    switch (sumValue.tag) {
      case 0:
        return new UpdateStatus(
          'Committed',
          DatabaseUpdate.fromValue(sumValue.value)
        );
      case 1:
        return new UpdateStatus('Failed', sumValue.value.asString());
      case 2:
        return new UpdateStatus('OutOfEnergy', undefined);
      default:
        throw 'unreachable';
    }
  }

  static Committed(value: DatabaseUpdate): UpdateStatus {
    return new UpdateStatus('Committed', value);
  }
  static Failed(value: string): UpdateStatus {
    return new UpdateStatus('Failed', value);
  }
  static OutOfEnergy(): UpdateStatus {
    return new UpdateStatus('OutOfEnergy', undefined);
  }
}

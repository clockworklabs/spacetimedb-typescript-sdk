import {
  AlgebraicType,
  BuiltinType,
  SumTypeVariant,
} from '../algebraic_type.ts';
import type { AlgebraicValue } from '../algebraic_value.ts';

export class EncodedValue {
  constructor(
    public tag: 'Binary' | 'Text',
    public value: string | Uint8Array
  ) {}

  static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createSumType([
      new SumTypeVariant(
        'Binary',
        AlgebraicType.createArrayType(
          AlgebraicType.createPrimitiveType(BuiltinType.Type.U8)
        )
      ),
      new SumTypeVariant(
        'Text',
        AlgebraicType.createPrimitiveType(BuiltinType.Type.String)
      ),
    ]);
  }

  static serialize(value: EncodedValue): object {
    switch (value.tag) {
      case 'Binary':
        return { Binary: Array.from(value.value as Uint8Array) };
      case 'Text':
        return { Text: value.value };
      default:
        throw 'unreachable';
    }
  }

  static fromValue(value: AlgebraicValue): EncodedValue {
    const sumValue = value.asSumValue();
    switch (sumValue.tag) {
      case 0:
        return new EncodedValue('Binary', sumValue.value.asBytes());

      case 1:
        return new EncodedValue('Text', sumValue.value.asString());

      default:
        throw 'unreachable';
    }
  }

  static Binary(value: string): EncodedValue {
    return new EncodedValue('Binary', value);
  }

  static Text(value: Uint8Array): EncodedValue {
    return new EncodedValue('Text', value);
  }
}

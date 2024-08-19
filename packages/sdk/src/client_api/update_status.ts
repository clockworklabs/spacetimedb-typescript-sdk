// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

import {
  AlgebraicType,
  BuiltinType,
  SumTypeVariant,
} from '../algebraic_type.ts';
import type { AlgebraicValue } from '../algebraic_value.ts';
import { DatabaseUpdate as __DatabaseUpdate } from './database_update.ts';

export namespace UpdateStatus {
  export function getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createSumType([
      new SumTypeVariant('Committed', __DatabaseUpdate.getAlgebraicType()),
      new SumTypeVariant(
        'Failed',
        AlgebraicType.createPrimitiveType(BuiltinType.Type.String)
      ),
      new SumTypeVariant('OutOfEnergy', AlgebraicType.createProductType([])),
    ]);
  }

  export function serialize(value: UpdateStatus): object {
    switch (value.tag) {
      case 'Committed':
        return { Committed: __DatabaseUpdate.serialize(value.value) };
      case 'Failed':
        return { Failed: value.value };
      case 'OutOfEnergy':
        return { OutOfEnergy: [] };
      default:
        throw 'unreachable';
    }
  }

  export type Committed = { tag: 'Committed'; value: __DatabaseUpdate };
  export const Committed = (value: __DatabaseUpdate): Committed => ({
    tag: 'Committed',
    value,
  });
  export type Failed = { tag: 'Failed'; value: string };
  export const Failed = (value: string): Failed => ({ tag: 'Failed', value });
  export type OutOfEnergy = { tag: 'OutOfEnergy'; value: undefined };
  export const OutOfEnergy = { tag: 'OutOfEnergy', value: undefined };

  export function fromValue(value: AlgebraicValue): UpdateStatus {
    let sumValue = value.asSumValue();
    switch (sumValue.tag) {
      case 0:
        return {
          tag: 'Committed',
          value: __DatabaseUpdate.fromValue(sumValue.value),
        };
      case 1:
        return { tag: 'Failed', value: sumValue.value.asString() };
      case 2:
        return { tag: 'OutOfEnergy', value: undefined };
      default:
        throw 'unreachable';
    }
  }
}

export type UpdateStatus =
  | UpdateStatus.Committed
  | UpdateStatus.Failed
  | UpdateStatus.OutOfEnergy;
export default UpdateStatus;

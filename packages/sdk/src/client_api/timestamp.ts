// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

import { AlgebraicType, ProductTypeElement } from '../algebraic_type.ts';
import type { AlgebraicValue } from '../algebraic_value.ts';

export class Timestamp {
  static tableName = 'Timestamp';
  microseconds: BigInt;

  static primaryKey: string | undefined = undefined;

  constructor(microseconds: BigInt) {
    this.microseconds = microseconds;
  }

  static serialize(value: Timestamp): object {
    return [value.microseconds];
  }

  static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement('microseconds', AlgebraicType.createU64Type()),
    ]);
  }

  static fromValue(value: AlgebraicValue): Timestamp {
    let productValue = value.asProductValue();
    let __microseconds = productValue.elements[0].asBigInt();
    return new this(__microseconds);
  }
}

export default Timestamp;

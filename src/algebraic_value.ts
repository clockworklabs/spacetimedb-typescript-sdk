import {
  ProductType,
  SumType,
  AlgebraicType,
  BuiltinType,
  EnumLabel,
  MapType,
} from "./algebraic_type";
import BinaryReader from "./binary_reader";

export class SumValue {
  public tag: number;
  public value: AlgebraicValue;

  constructor(tag: number, value: AlgebraicValue) {
    this.tag = tag;
    this.value = value;
  }

  public static deserialize(
    type: SumType | undefined,
    reader: BinaryReader
  ): SumValue {
    if (type === undefined) {
      // TODO: get rid of undefined here
      throw "sum type is undefined";
    }

    let tag = reader.readByte();
    let variant = type.variants[tag];
    let at = variant.algebraicType;
    let sumValue = AlgebraicValue.deserialize(
      type.variants[tag].algebraicType,
      reader
    );
    return new SumValue(tag, sumValue);
  }
}

export class ProductValue {
  elements: AlgebraicValue[];

  constructor(elements: AlgebraicValue[]) {
    this.elements = elements;
  }

  public static deserialize(
    type: ProductType | undefined,
    reader: BinaryReader
  ): ProductValue {
    if (type === undefined) {
      throw "type is undefined";
    }

    let elements: AlgebraicValue[] = [];

    for (let element of type.elements) {
      elements.push(AlgebraicValue.deserialize(element.algebraicType, reader));
    }
    return new ProductValue(elements);
  }
}

type BuiltinValueType =
  | boolean
  | string
  | number
  | AlgebraicValue[]
  | BigInt
  | Map<AlgebraicValue, AlgebraicValue>
  | Uint8Array;

export class BuiltinValue {
  value: BuiltinValueType;

  constructor(value: BuiltinValueType) {
    this.value = value;
  }

  public static deserialize(
    type: BuiltinType,
    reader: BinaryReader
  ): BuiltinValue {
    switch (type.type) {
      case BuiltinType.Type.Array:
        let arrayBuiltinType: BuiltinType.Type | undefined =
          type.arrayType &&
          type.arrayType.type === AlgebraicType.Type.BuiltinType
            ? type.arrayType.builtin.type
            : undefined;
        if (
          arrayBuiltinType !== undefined &&
          arrayBuiltinType === BuiltinType.Type.U8
        ) {
          const length = reader.readU32();
          const value = reader.readUInt8Array(length);
          return new this(value);
        } else {
          const length = reader.readU32();
          let result: AlgebraicValue[] = [];
          for (let i = 0; i < length; i++) {
            result.push(
              AlgebraicValue.deserialize(
                type.arrayType as AlgebraicType,
                reader
              )
            );
          }
          return new this(result);
        }
      case BuiltinType.Type.Map:
        const mapLength = reader.readU32();
        let result: Map<AlgebraicValue, AlgebraicValue> = new Map();
        for (let i = 0; i < mapLength; i++) {
          const key = AlgebraicValue.deserialize(
            (type.mapType as MapType).keyType,
            reader
          );
          const value = AlgebraicValue.deserialize(
            (type.mapType as MapType).valueType,
            reader
          );
          result.set(key, value);
        }
        return new this(result);
      case BuiltinType.Type.String:
        const strLength = reader.readU32();
        return new this(reader.readString(strLength));
      default:
        return new this(reader["read" + type.type]());
    }
  }

  public asString(): string {
    return this.value as string;
  }

  public asArray(): AlgebraicValue[] {
    return this.value as AlgebraicValue[];
  }

  public asJsArray(type: string): any[] {
    return this.asArray().map((el) => el["as" + type]());
  }

  public asNumber(): number {
    return this.value as number;
  }

  public asBool(): boolean {
    return this.value as boolean;
  }

  public asBigInt(): BigInt {
    return this.value as BigInt;
  }

  public asBoolean(): boolean {
    return this.value as boolean;
  }

  public asBytes(): Uint8Array {
    return this.value as Uint8Array;
  }
}

type AnyValue = SumValue | ProductValue | BuiltinValue;

export class AlgebraicValue {
  sum: SumValue | undefined;
  product: ProductValue | undefined;
  builtin: BuiltinValue | undefined;

  constructor(value: AnyValue | undefined) {
    if (value === undefined) {
      // TODO: possibly get rid of it
      throw "value is undefined";
    }
    switch (value.constructor) {
      case SumValue:
        this.sum = value as SumValue;
        break;
      case ProductValue:
        this.product = value as ProductValue;
        break;
      case BuiltinValue:
        this.builtin = value as BuiltinValue;
        break;
    }
  }

  public static deserialize(type: AlgebraicType, reader: BinaryReader) {
    switch (type.type) {
      case AlgebraicType.Type.ProductType:
        return new this(ProductValue.deserialize(type.product, reader));
      case AlgebraicType.Type.SumType:
        return new this(SumValue.deserialize(type.sum, reader));
      case AlgebraicType.Type.BuiltinType:
        return new this(BuiltinValue.deserialize(type.builtin, reader));
      default:
        throw new Error("not implemented");
    }
  }

  public asProductValue(): ProductValue {
    if (!this.product) {
      throw "AlgebraicValue is not a ProductValue and product was requested";
    }
    return this.product as ProductValue;
  }

  public asBuiltinValue(): BuiltinValue {
    this.assertBuiltin();
    return this.builtin as BuiltinValue;
  }

  public asSumValue(): SumValue {
    if (!this.sum) {
      throw "AlgebraicValue is not a SumValue and a sum value was requested";
    }

    return this.sum as SumValue;
  }

  public asArray(): AlgebraicValue[] {
    this.assertBuiltin();
    return (this.builtin as BuiltinValue).asArray();
  }

  public asString(): string {
    this.assertBuiltin();
    return (this.builtin as BuiltinValue).asString();
  }

  public asNumber(): number {
    this.assertBuiltin();
    return (this.builtin as BuiltinValue).asNumber();
  }

  public asBool(): boolean {
    this.assertBuiltin();
    return (this.builtin as BuiltinValue).asBool();
  }

  public asBigInt(): BigInt {
    this.assertBuiltin();
    return (this.builtin as BuiltinValue).asBigInt();
  }

  public asBoolean(): boolean {
    this.assertBuiltin();
    return (this.builtin as BuiltinValue).asBool();
  }

  public asBytes(): Uint8Array {
    this.assertBuiltin();
    return (this.builtin as BuiltinValue).asBytes();
  }

  private assertBuiltin() {
    if (!this.builtin) {
      throw "AlgebraicValue is not a BuiltinValue and a string was requested";
    }
  }
}

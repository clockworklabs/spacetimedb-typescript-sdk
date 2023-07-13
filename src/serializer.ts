import { AlgebraicType, BuiltinType } from "./algebraic_type";
import BinaryWriter from "./binary_writer";

export interface Serializer {
  write(type: AlgebraicType, value: any): any;
  args(): any;
}

export class JSONSerializer {
  private content: any[];
  private index: number = 0;

  constructor() {
    this.content = [];
  }

  args(): any {
    return this.content;
  }

  serializeBuiltinType(type: BuiltinType, value: any): any {
    switch (type.type) {
      case BuiltinType.Type.Array:
        const returnArray: any[] = [];
        for (const element of value) {
          returnArray.push(
            this.serializeType(type.arrayType as AlgebraicType, element)
          );
        }
        return returnArray;
      case BuiltinType.Type.Map:
        break;
      default:
        return value;
    }
  }

  serializeType(type: AlgebraicType, value: any) {
    switch (type.type) {
      case AlgebraicType.Type.BuiltinType:
        return this.serializeBuiltinType(type.builtin, value);
      case AlgebraicType.Type.ProductType:
        let serializedArray: any[] = [];
        for (const element of type.product.elements) {
          const serialized = this.serializeType(
            element.algebraicType,
            value[element.name]
          );
          serializedArray.push(serialized);
        }
        return serializedArray;
      case AlgebraicType.Type.SumType:
        if (
          type.sum.variants.length == 2 &&
          type.sum.variants[0].name === "some" &&
          type.sum.variants[1].name === "none"
        ) {
          return value;
        } else {
          const variant = type.sum.variants.find((v) => v.name === value.tag);
          if (!variant) {
            throw `Can't serialize a sum type, couldn't find ${value.tag} tag`;
          }

          return this.serializeType(variant.algebraicType, value.value);
        }
      default:
        break;
    }
  }

  write(type: AlgebraicType, value: any) {
    this.content[this.index] = this.serializeType(type, value);
    this.index += 1;
  }
}

export class BinarySerializer {
  private writer: BinaryWriter;

  constructor() {
    this.writer = new BinaryWriter(1024);
  }

  args(): any {
    return this.getBuffer();
  }

  getBuffer(): Uint8Array {
    return this.writer.getBuffer();
  }

  write(type: AlgebraicType, value: any) {
    switch (type.type) {
      case AlgebraicType.Type.BuiltinType:
        this.writeBuiltinType(type.builtin, value);
        break;
      case AlgebraicType.Type.ProductType:
        for (const element of type.product.elements) {
          this.write(element.algebraicType, value[element.name]);
        }
        break;
      case AlgebraicType.Type.SumType:
        if (
          type.sum.variants.length == 2 &&
          type.sum.variants[0].name === "some" &&
          type.sum.variants[1].name === "none"
        ) {
          if (value) {
            this.writeByte(0);
            this.write(type.sum.variants[0].algebraicType, value);
          } else {
            this.writeByte(1);
          }
        } else {
          const index = type.sum.variants.findIndex(
            (v) => v.name === value.tag
          );
          if (index < 0) {
            throw `Can't serialize a sum type, couldn't find ${value.tag} tag`;
          }

          this.writeByte(index);
          this.write(type.sum.variants[index].algebraicType, value.value);
        }
        break;
      default:
        break;
    }
  }

  writeBuiltinType(type: BuiltinType, value: any) {
    switch (type.type) {
      case BuiltinType.Type.Array:
        this.writer.writeUInt8Array(value);
        break;
      case BuiltinType.Type.Map:
        break;
      case BuiltinType.Type.String:
        this.writer.writeString(value);
        break;
      default:
        this.writer["write" + type.type](value);
        break;
    }
  }

  writeByte(byte: number) {
    this.writer.writeU8(byte);
  }
}

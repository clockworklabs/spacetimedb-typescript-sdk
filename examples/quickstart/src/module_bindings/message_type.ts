// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

import {
  // @ts-ignore
  Address,
  // @ts-ignore
  AlgebraicType,
  // @ts-ignore
  AlgebraicValue,
  // @ts-ignore
  BinaryReader,
  // @ts-ignore
  BinaryWriter,
  // @ts-ignore
  DBConnectionBuilder,
  // @ts-ignore
  DBConnectionImpl,
  // @ts-ignore
  DBContext,
  // @ts-ignore
  Event,
  // @ts-ignore
  EventContextInterface,
  // @ts-ignore
  Identity,
  // @ts-ignore
  ProductType,
  // @ts-ignore
  ProductTypeElement,
  // @ts-ignore
  SumType,
  // @ts-ignore
  SumTypeVariant,
  // @ts-ignore
  TableCache,
} from '@clockworklabs/spacetimedb-sdk';
export type Message = {
  sender: Identity;
  sent: bigint;
  text: string;
};

/**
 * A namespace for generated helper functions.
 */
export namespace Message {
  /**
   * A function which returns this type represented as an AlgebraicType.
   * This function is derived from the AlgebraicType used to generate this type.
   */
  export function getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement('sender', AlgebraicType.createIdentityType()),
      new ProductTypeElement('sent', AlgebraicType.createU64Type()),
      new ProductTypeElement('text', AlgebraicType.createStringType()),
    ]);
  }

  export function serialize(writer: BinaryWriter, value: Message): void {
    const converted = {
      sender: value.sender,
      sent: value.sent,
      text: value.text,
    };
    Message.getAlgebraicType().serialize(writer, converted);
  }

  export function deserialize(reader: BinaryReader): Message {
    const value = Message.getAlgebraicType().deserialize(reader);
    return {
      sender: value.sender,
      sent: value.sent,
      text: value.text,
    };
  }
}
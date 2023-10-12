// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import {
  __SPACETIMEDB__,
  AlgebraicType,
  ProductType,
  BuiltinType,
  ProductTypeElement,
  SumType,
  SumTypeVariant,
  IDatabaseTable,
  AlgebraicValue,
  ReducerEvent,
  Identity,
  Address,
} from "@clockworklabs/spacetimedb-sdk";

export class Message extends IDatabaseTable {
  public static tableName = "Message";
  public sender: Identity;
  public sent: number;
  public text: string;

  constructor(sender: Identity, sent: number, text: string) {
    super();
    this.sender = sender;
    this.sent = sent;
    this.text = text;
  }

  public static serialize(value: Message): object {
    return [Array.from(value.sender.toUint8Array()), value.sent, value.text];
  }

  public static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        "sender",
        AlgebraicType.createProductType([
          new ProductTypeElement(
            "__identity_bytes",
            AlgebraicType.createArrayType(
              AlgebraicType.createPrimitiveType(BuiltinType.Type.U8)
            )
          ),
        ])
      ),
      new ProductTypeElement(
        "sent",
        AlgebraicType.createPrimitiveType(BuiltinType.Type.U64)
      ),
      new ProductTypeElement(
        "text",
        AlgebraicType.createPrimitiveType(BuiltinType.Type.String)
      ),
    ]);
  }

  public static fromValue(value: AlgebraicValue): Message {
    let productValue = value.asProductValue();
    let __sender = new Identity(
      productValue.elements[0].asProductValue().elements[0].asBytes()
    );
    let __sent = productValue.elements[1].asNumber();
    let __text = productValue.elements[2].asString();
    return new this(__sender, __sent, __text);
  }

  public static count(): number {
    return __SPACETIMEDB__.clientDB.getTable("Message").count();
  }

  public static all(): Message[] {
    return __SPACETIMEDB__.clientDB
      .getTable("Message")
      .getInstances() as unknown as Message[];
  }

  public static filterBySender(value: Identity): Message[] {
    let result: Message[] = [];
    for (let instance of __SPACETIMEDB__.clientDB
      .getTable("Message")
      .getInstances()) {
      if (instance.sender.isEqual(value)) {
        result.push(instance);
      }
    }
    return result;
  }

  public static filterBySent(value: number): Message[] {
    let result: Message[] = [];
    for (let instance of __SPACETIMEDB__.clientDB
      .getTable("Message")
      .getInstances()) {
      if (instance.sent === value) {
        result.push(instance);
      }
    }
    return result;
  }

  public static filterByText(value: string): Message[] {
    let result: Message[] = [];
    for (let instance of __SPACETIMEDB__.clientDB
      .getTable("Message")
      .getInstances()) {
      if (instance.text === value) {
        result.push(instance);
      }
    }
    return result;
  }

  public static onInsert(
    callback: (value: Message, reducerEvent: ReducerEvent | undefined) => void
  ) {
    __SPACETIMEDB__.clientDB.getTable("Message").onInsert(callback);
  }

  public static onUpdate(
    callback: (
      oldValue: Message,
      newValue: Message,
      reducerEvent: ReducerEvent | undefined
    ) => void
  ) {
    __SPACETIMEDB__.clientDB.getTable("Message").onUpdate(callback);
  }

  public static onDelete(
    callback: (value: Message, reducerEvent: ReducerEvent | undefined) => void
  ) {
    __SPACETIMEDB__.clientDB.getTable("Message").onDelete(callback);
  }

  public static removeOnInsert(
    callback: (value: Message, reducerEvent: ReducerEvent | undefined) => void
  ) {
    __SPACETIMEDB__.clientDB.getTable("Message").removeOnInsert(callback);
  }

  public static removeOnUpdate(
    callback: (
      oldValue: Message,
      newValue: Message,
      reducerEvent: ReducerEvent | undefined
    ) => void
  ) {
    __SPACETIMEDB__.clientDB.getTable("Message").removeOnUpdate(callback);
  }

  public static removeOnDelete(
    callback: (value: Message, reducerEvent: ReducerEvent | undefined) => void
  ) {
    __SPACETIMEDB__.clientDB.getTable("Message").removeOnDelete(callback);
  }
}

export default Message;

__SPACETIMEDB__.registerComponent("Message", Message);

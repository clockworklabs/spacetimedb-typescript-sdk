// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

import {
  AlgebraicType,
  AlgebraicValue,
  DBConnectionBase,
  DbContext,
  Identity,
  ProductTypeElement,
} from '@clockworklabs/spacetimedb-sdk';

type Message = {
  sender: Identity;
  sent: bigint;
  text: string;
};

export class MessageTable<
  DbView,
  ReducerView,
  ReducerEnum,
  EventContext extends DbContext<DbView, ReducerView>,
> {
  tableName = 'Message';
  sender: Identity;
  sent: bigint;
  text: string;

  #client: DBConnectionBase<ReducerEnum, EventContext>;

  constructor(
    client: DBConnectionBase<ReducerEnum, EventContext>,
    sender: Identity,
    sent: bigint,
    text: string
  ) {
    this.#client = client;
    this.sender = sender;
    this.sent = sent;
    this.text = text;
  }

  public static serialize(value: Message): object {
    return [Array.from(value.sender.toUint8Array()), value.sent, value.text];
  }

  static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        'sender',
        AlgebraicType.createProductType([
          new ProductTypeElement(
            '__identity_bytes',
            AlgebraicType.createArrayType(AlgebraicType.createU8Type())
          ),
        ])
      ),
      new ProductTypeElement('sent', AlgebraicType.createU64Type()),
      new ProductTypeElement('text', AlgebraicType.createStringType()),
    ]);
  }

  static fromValue<
    DbView,
    ReducerView,
    ReducerEnum,
    EventContext extends DbContext<any, any>,
  >(
    client: DBConnectionBase<ReducerEnum, EventContext>,
    value: AlgebraicValue
  ): MessageTable<DbView, ReducerView, ReducerEnum, EventContext> {
    let productValue = value.asProductValue();
    let __sender = productValue.elements[0].asIdentity();
    let __sent = productValue.elements[1].asBigInt();
    let __text = productValue.elements[2].asString();
    return new this(client, __sender, __sent, __text);
  }

  *filterBySender(value: Identity): IterableIterator<Message> {
    for (let instance of this.#client.db.getTable('Message').getInstances()) {
      if (instance.sender.isEqual(value)) {
        yield instance;
      }
    }
  }

  *filterBySent(value: BigInt): IterableIterator<Message> {
    for (let instance of this.#client.db.getTable('Message').getInstances()) {
      if (instance.sent === value) {
        yield instance;
      }
    }
  }

  *filterByText(value: string): IterableIterator<Message> {
    for (let instance of this.#client.db.getTable('Message').getInstances()) {
      if (instance.text === value) {
        yield instance;
      }
    }
  }
}

// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.
import {
  AlgebraicType,
  AlgebraicValue,
  DBConnectionBase,
  Reducer,
  ReducerArgsAdapter,
} from "@clockworklabs/spacetimedb-sdk";

export class SendMessageReducer<
  EventContext,
  DBView,
  ReducerView,
  ReducerEnum,
> extends Reducer<[text: string], DBView, ReducerView, EventContext,ReducerEnum> {
  constructor(client: DBConnectionBase) {
    super(client, "SendMessage");
  }

  call(_text: string) {
    this.#call(_text);
  }

  #call(_text: string) {
    const serializer = this.client.getSerializer();
    let _textType = AlgebraicType.createStringType();
    serializer.write(_textType, _text);
    this.client.call("SendMessage", serializer);
  }

  public static deserializeArgs(adapter: ReducerArgsAdapter): any[] {
    let textType = AlgebraicType.createStringType();
    let textValue = AlgebraicValue.deserialize(textType, adapter.next());
    let text = textValue.asString();
    return [text];
  }
}
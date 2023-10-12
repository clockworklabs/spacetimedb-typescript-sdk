// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import {
  __SPACETIMEDB__,
  AlgebraicType,
  ProductType,
  BuiltinType,
  ProductTypeElement,
  IDatabaseTable,
  AlgebraicValue,
  ReducerArgsAdapter,
  SumTypeVariant,
  Serializer,
  Identity,
  Address,
  ReducerEvent,
} from "@clockworklabs/spacetimedb-sdk";

export class SendMessageReducer {
  public static call(_text: string) {
    if (__SPACETIMEDB__.spacetimeDBClient) {
      const serializer = __SPACETIMEDB__.spacetimeDBClient.getSerializer();
      let _textType = AlgebraicType.createPrimitiveType(
        BuiltinType.Type.String
      );
      serializer.write(_textType, _text);
      __SPACETIMEDB__.spacetimeDBClient.call("send_message", serializer);
    }
  }

  public static deserializeArgs(adapter: ReducerArgsAdapter): any[] {
    let textType = AlgebraicType.createPrimitiveType(BuiltinType.Type.String);
    let textValue = AlgebraicValue.deserialize(textType, adapter.next());
    let text = textValue.asString();
    return [text];
  }

  public static on(
    callback: (reducerEvent: ReducerEvent, reducerArgs: any[]) => void
  ) {
    if (__SPACETIMEDB__.spacetimeDBClient) {
      __SPACETIMEDB__.spacetimeDBClient.on("reducer:SendMessage", callback);
    }
  }
}

__SPACETIMEDB__.reducers.set("SendMessage", SendMessageReducer);
if (__SPACETIMEDB__.spacetimeDBClient) {
  __SPACETIMEDB__.spacetimeDBClient.registerReducer(
    "SendMessage",
    SendMessageReducer
  );
}

export default SendMessageReducer;

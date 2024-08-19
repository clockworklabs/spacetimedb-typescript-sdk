// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import {
  __SPACETIMEDB__,
  AlgebraicType,
  ProductType,
  ProductTypeElement,
  DatabaseTable,
  AlgebraicValue,
  ReducerArgsAdapter,
  SumTypeVariant,
  Serializer,
  Identity,
  Address,
  ReducerEvent,
  Reducer,
  SpacetimeDBClient,
} from "@clockworklabs/spacetimedb-sdk";

export class SetNameReducer extends Reducer {
  public static reducerName: string = "SetName";
  public static call(_name: string) {
    this.getReducer().call(_name);
  }

  public call(_name: string) {
    const serializer = this.client.getSerializer();
    let _nameType = AlgebraicType.createStringType();
    serializer.write(_nameType, _name);
    this.client.call("set_name", serializer);
  }

  public static deserializeArgs(adapter: ReducerArgsAdapter): any[] {
    let nameType = AlgebraicType.createStringType();
    let nameValue = AlgebraicValue.deserialize(nameType, adapter.next());
    let name = nameValue.asString();
    return [name];
  }

  public static on(
    callback: (reducerEvent: ReducerEvent, _name: string) => void
  ) {
    this.getReducer().on(callback);
  }
  public on(callback: (reducerEvent: ReducerEvent, _name: string) => void) {
    this.client.on("reducer:SetName", callback);
  }
}

export default SetNameReducer;

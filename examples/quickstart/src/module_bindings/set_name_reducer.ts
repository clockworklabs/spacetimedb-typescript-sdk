// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.
import { AlgebraicType, AlgebraicValue, DBConnectionBase, Reducer, ReducerArgsAdapter } from "@clockworklabs/spacetimedb-sdk";

export class SetNameReducer<EventContext, DBView, ReducerView> extends Reducer<[name: string], DBView, ReducerView, EventContext> {
	constructor(client: DBConnectionBase) {
		super(client, 'SetName')
	}

	call(_name: string) {
		this.#call(_name);
	}

	#call(_name: string) {
		const serializer = this.client.getSerializer();
		let _nameType = AlgebraicType.createStringType();
		serializer.write(_nameType, _name);
		this.client.call("set_name", serializer);
	}

	deserializeArgs(adapter: ReducerArgsAdapter): any[] {
		let nameType = AlgebraicType.createStringType();
		let nameValue = AlgebraicValue.deserialize(nameType, adapter.next())
		let name = nameValue.asString();
		return [name];
	}
}
// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

import {
    // @ts-ignore
    AlgebraicType,
    // @ts-ignore
    ProductType,
    // @ts-ignore
    ProductTypeElement,
    // @ts-ignore
    SumType,
    // @ts-ignore
    SumTypeVariant,
    // @ts-ignore
    AlgebraicValue,
    // @ts-ignore
    Identity,
    // @ts-ignore
    Address,
    // @ts-ignore
    DBConnectionBuilder,
    // @ts-ignore
    TableCache,
    // @ts-ignore
    BinaryWriter,
    // @ts-ignore
    EventContext,
    // @ts-ignore
    BinaryReader,
    // @ts-ignore
    DBConnectionImpl,
    // @ts-ignore
    DBContext,
    // @ts-ignore
    Event,
} from "@clockworklabs/spacetimedb-sdk";


export type SendMessage = {
	text: string,
};

// A namespace for generated helper functions.
export namespace SendMessage {
	// A function which returns this type represented as an AlgebraicType.
	// This function is derived from the AlgebraicType used to generate this type.
	export function getAlgebraicType(): AlgebraicType {
		return AlgebraicType.createProductType([
			new ProductTypeElement("text", AlgebraicType.createStringType()),
		]);
	}

	export function serialize(writer: BinaryWriter, value: SendMessage): void {
	    SendMessage.getAlgebraicType().serialize(writer, value);
	}

	export function deserialize(reader: BinaryReader): SendMessage {
	    return SendMessage.getAlgebraicType().deserialize(reader);
	}
}


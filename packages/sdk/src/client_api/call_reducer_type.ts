// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN YOUR MODULE SOURCE CODE INSTEAD.

import {
  // @ts-ignore
  AlgebraicType,
  // @ts-ignore
  AlgebraicValue,
  // @ts-ignore
  BinaryReader,
  // @ts-ignore
  BinaryWriter,
  // @ts-ignore
  CallReducerFlags,
  // @ts-ignore
  ConnectionId,
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
  // @ts-ignore
  deepEqual,
} from '../index';
export type CallReducer = {
  reducer: string;
  args: Uint8Array;
  requestId: number;
  flags: number;
};

/**
 * A namespace for generated helper functions.
 */
export namespace CallReducer {
  /**
   * A function which returns this type represented as an AlgebraicType.
   * This function is derived from the AlgebraicType used to generate this type.
   */
  export function getTypeScriptAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement('reducer', AlgebraicType.createStringType()),
      new ProductTypeElement(
        'args',
        AlgebraicType.createArrayType(AlgebraicType.createU8Type())
      ),
      new ProductTypeElement('requestId', AlgebraicType.createU32Type()),
      new ProductTypeElement('flags', AlgebraicType.createU8Type()),
    ]);
  }

  export function serialize(writer: BinaryWriter, value: CallReducer): void {
    CallReducer.getTypeScriptAlgebraicType().serialize(writer, value);
  }

  export function deserialize(reader: BinaryReader): CallReducer {
    return CallReducer.getTypeScriptAlgebraicType().deserialize(reader);
  }
}

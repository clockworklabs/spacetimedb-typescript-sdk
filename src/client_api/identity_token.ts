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
  DatabaseTable,
  AlgebraicValue,
  ReducerEvent,
  Identity,
  Address,
  ClientDB,
  SpacetimeDBClient,
} from "../index";

export class IdentityToken {
  public static tableName = "IdentityToken";
  public identity: Identity;
  public token: string;
  public address: Address;

  public static primaryKey: string | undefined = undefined;

  constructor(identity: Identity, token: string, address: Address) {
    this.identity = identity;
    this.token = token;
    this.address = address;
  }

  public static serialize(value: IdentityToken): object {
    return [
      Array.from(value.identity.toUint8Array()),
      value.token,
      Array.from(value.address.toUint8Array()),
    ];
  }

  public static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        "identity",
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
        "token",
        AlgebraicType.createPrimitiveType(BuiltinType.Type.String)
      ),
      new ProductTypeElement(
        "address",
        AlgebraicType.createProductType([
          new ProductTypeElement(
            "__address_bytes",
            AlgebraicType.createArrayType(
              AlgebraicType.createPrimitiveType(BuiltinType.Type.U8)
            )
          ),
        ])
      ),
    ]);
  }

  public static fromValue(value: AlgebraicValue): IdentityToken {
    let productValue = value.asProductValue();
    let __identity = new Identity(
      productValue.elements[0].asProductValue().elements[0].asBytes()
    );
    let __token = productValue.elements[1].asString();
    let __address = new Address(
      productValue.elements[2].asProductValue().elements[0].asBytes()
    );
    return new this(__identity, __token, __address);
  }
}

export default IdentityToken;

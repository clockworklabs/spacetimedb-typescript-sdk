// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import {
  __SPACETIMEDB__,
  AlgebraicType,
  ProductType,
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
            AlgebraicType.createBytesType()
          ),
        ])
      ),
      new ProductTypeElement("token", AlgebraicType.createStringType()),
      new ProductTypeElement(
        "address",
        AlgebraicType.createProductType([
          new ProductTypeElement(
            "__address_bytes",
            AlgebraicType.createBytesType()
          ),
        ])
      ),
    ]);
  }

  public static fromValue(value: AlgebraicValue): IdentityToken {
    let productValue = value.asProductValue();
    let __identity = productValue.elements[0].asIdentity();
    let __token = productValue.elements[1].asString();
    let __address = productValue.elements[2].asAddress();
    return new this(__identity, __token, __address);
  }
}

export default IdentityToken;
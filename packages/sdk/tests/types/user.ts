// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import {
  __SPACETIMEDB__,
  AlgebraicType,
  AlgebraicValue,
  ClientDB,
  DatabaseTable,
  Identity,
  ProductTypeElement,
} from '../../src/index';

export class User extends DatabaseTable {
  public static db: ClientDB = __SPACETIMEDB__.clientDB;
  public static tableName = 'User';
  public identity: Identity;
  public username: string;

  public static primaryKey: string | undefined = 'identity';

  constructor(identity: Identity, username: string) {
    super();
    this.identity = identity;
    this.username = username;
  }

  public static serialize(value: User): object {
    return [Array.from(value.identity.toUint8Array()), value.username];
  }

  public static getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createProductType([
      new ProductTypeElement(
        'identity',
        AlgebraicType.createProductType([
          new ProductTypeElement(
            '__identity_bytes',
            AlgebraicType.createBytesType()
          ),
        ])
      ),
      new ProductTypeElement('username', AlgebraicType.createStringType()),
    ]);
  }

  public static fromValue(value: AlgebraicValue): User {
    let productValue = value.asProductValue();
    let __identity = productValue.elements[0].asIdentity();
    let __username = productValue.elements[1].asString();
    return new this(__identity, __username);
  }

  public static filterByIdentity(value: Identity): User[] {
    let result: User[] = [];
    for (let instance of this.db.getTable('User').getInstances()) {
      if (instance.identity.isEqual(value)) {
        result.push(instance);
      }
    }
    return result;
  }

  public static filterByUsername(value: string): User[] {
    let result: User[] = [];
    for (let instance of this.db.getTable('User').getInstances()) {
      if (instance.username === value) {
        result.push(instance);
      }
    }
    return result;
  }
}

export default User;

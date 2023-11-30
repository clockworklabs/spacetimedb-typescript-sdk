import { ClientDB } from "./spacetimedb";

export type DatabaseTableClass = {
  new (...args: any[]): DatabaseTable;
  db?: ClientDB;
  tableName: string;
};

export abstract class DatabaseTable {
  public static db?: ClientDB;

  public static with<T extends DatabaseTable>(
    client: SpacetimeDBClient
  ): typeof T {
    return _tableProxy<T>(T, client) as unknown as typeof T;
  }

  public static count(): number {
    return this.db.getTable(this.tableName).count();
  }

  public static all<T extends DatabaseTable>(): InstanceType<T>[] {
    return this.db
      .getTable(this.tableName)
      .getInstances() as unknown as InstanceType<T>[];
  }

  public static onInsert<T extends DatabaseTable>(
    this: new (...args: ConstructorParameters<T>) => T,
    callback: (
      value: InstanceType<T>,
      reducerEvent: ReducerEvent | undefined
    ) => void
  ) {
    this.db.getTable(this.tableName).onInsert(callback);
  }

  public static onUpdate<T extends DatabaseTable>(
    this: new (...args: ConstructorParameters<T>) => T,
    callback: (
      oldValue: InstanceType<T>,
      newValue: InstanceType<T>,
      reducerEvent: ReducerEvent | undefined
    ) => void
  ) {
    this.db.getTable(this.tableName).onUpdate(callback);
  }

  public static onDelete<T extends DatabaseTable>(
    this: new (...args: ConstructorParameters<T>) => T,
    callback: (
      value: InstanceType<T>,
      reducerEvent: ReducerEvent | undefined
    ) => void
  ) {
    this.db.getTable(this.tableName).onDelete(callback);
  }

  public static removeOnInsert<T extends DatabaseTable>(
    this: new (...args: ConstructorParameters<T>) => T,
    callback: (
      value: InstanceType<T>,
      reducerEvent: ReducerEvent | undefined
    ) => void
  ) {
    this.db.getTable(this.tableName).removeOnInsert(callback);
  }

  public static removeOnUpdate<T extends DatabaseTable>(
    this: new (...args: ConstructorParameters<T>) => T,
    callback: (
      oldValue: InstanceType<T>,
      newValue: InstanceType<T>,
      reducerEvent: ReducerEvent | undefined
    ) => void
  ) {
    this.db.getTable(this.tableName).removeOnUpdate(callback);
  }

  public static removeOnDelete<T extends DatabaseTable>(
    this: new (...args: ConstructorParameters<T>) => T,
    callback: (
      value: InstanceType<T>,
      reducerEvent: ReducerEvent | undefined
    ) => void
  ) {
    this.db.getTable(this.tableName).removeOnDelete(callback);
  }
}

import { SpacetimeDBClient } from "./spacetimedb";

export type ReducerClass = { new (...args: any[]): Reducer };
export class Reducer {
  public call(..._args: any[]): void {
    throw "not implemented";
  }
  public on(..._args: any[]): void {
    throw "not implemented";
  }

  protected client: SpacetimeDBClient;

  public static with<T extends typeof Reducer>(
    client: SpacetimeDBClient
  ): InstanceType<T> {
    return new this(client) as InstanceType<T>;
  }

  protected static reducer?: any;
  protected static getReducer<T extends typeof Reducer>(): InstanceType<T> {
    if (!this.reducer && __SPACETIMEDB__.spacetimeDBClient) {
      this.reducer = new this(__SPACETIMEDB__.spacetimeDBClient);
    }

    if (this.reducer) {
      return this.reducer as InstanceType<T>;
    } else {
      throw "You need to instantiate a client in order to use reducers.";
    }
  }

  constructor(client: SpacetimeDBClient) {
    this.client = client;
  }
}

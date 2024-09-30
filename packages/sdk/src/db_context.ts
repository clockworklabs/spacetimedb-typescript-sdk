import type { DBConnection } from './db_connection.ts';

export class DbContext<DbView, ReducerView> {
  #client: DBConnection;

  readonly db: DbView;
  readonly reducers: ReducerView;

  readonly identity: string | undefined;
  readonly address: string | undefined;

  isActive: boolean;

  constructor(client: DBConnection, db: DbView, reducers: ReducerView) {
    this.#client = client;
    this.db = db;
    this.reducers = reducers;
    this.isActive = client.isActive;

    this.#client.on('connected', () => {
      this.isActive = true;
    });

    this.#client.on('disconnected', () => {
      this.isActive = false;
    });
  }

  // TODO: Later
  onSubscriptionApplied(callback: () => void): void {}
}

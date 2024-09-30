import { DBConnection } from './db_connection.ts';
import type { CallbackInit } from './types.ts';

export class Reducer {
  reducerName: string;
  client: DBConnection;

  constructor(client: DBConnection, reducerName: string) {
    this.reducerName = reducerName;
    this.client = client;
  }

  call(..._args: any[]): void {
    throw 'not implemented';
  }

  on(
    callback: (ctx: any /* EventContext */, ...args: any[]) => void,
    init?: CallbackInit
  ): void {
    this.client.on('reducer:' + this.reducerName, callback);

    if (init?.signal) {
      init.signal.addEventListener('abort', () => {
        this.client.off(`reducer:${this.reducerName}`, callback);
      });
    }
  }
}

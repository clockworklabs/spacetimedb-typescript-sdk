import { Address } from './address.ts';
import { Identity } from './identity.ts';
import { TableUpdate } from './table.ts';

export class SubscriptionUpdateMessage {
  tableUpdates: TableUpdate[];

  constructor(tableUpdates: TableUpdate[]) {
    this.tableUpdates = tableUpdates;
  }
}

export class TransactionUpdateEvent {
  identity: Identity;
  address: Address | null;
  originalReducerName: string;
  reducerName: string;
  args: Uint8Array;
  status: string;
  message: string;

  constructor(
    identity: Identity,
    address: Address | null,
    originalReducerName: string,
    reducerName: string,
    args: Uint8Array,
    status: string,
    message: string
  ) {
    this.identity = identity;
    this.address = address;
    this.originalReducerName = originalReducerName;
    this.reducerName = reducerName;
    this.args = args;
    this.status = status;
    this.message = message;
  }
}

export class TransactionUpdateMessage {
  tableUpdates: TableUpdate[];
  event: TransactionUpdateEvent;

  constructor(tableUpdates: TableUpdate[], event: TransactionUpdateEvent) {
    this.tableUpdates = tableUpdates;
    this.event = event;
  }
}

export class IdentityTokenMessage {
  identity: Identity;
  token: string;
  address: Address;

  constructor(identity: Identity, token: string, address: Address) {
    this.identity = identity;
    this.token = token;
    this.address = address;
  }
}
export type Message =
  | SubscriptionUpdateMessage
  | TransactionUpdateMessage
  | IdentityTokenMessage;

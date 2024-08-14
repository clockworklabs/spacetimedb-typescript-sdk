import { Address } from './address';
import { Identity } from './identity';

export class ReducerEvent {
  callerIdentity: Identity;
  callerAddress: Address | null;
  reducerName: string;
  status: string;
  message: string;
  args: any;

  constructor(
    callerIdentity: Identity,
    callerAddress: Address | null,
    reducerName: string,
    status: string,
    message: string,
    args: any
  ) {
    this.callerIdentity = callerIdentity;
    this.callerAddress = callerAddress;
    this.reducerName = reducerName;
    this.status = status;
    this.message = message;
    this.args = args;
  }
}

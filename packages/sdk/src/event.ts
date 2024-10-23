import type { ReducerEvent } from './reducer_event';

export type Event<
  Reducer extends { name: string; index: number; id: number; args?: any } = { name: string; index: number; id: number; args?: any },
> =
  | { tag: 'Reducer'; value: ReducerEvent<Reducer> }
  | { tag: 'SubscribeApplied' }
  | { tag: 'UnsubscribeApplied' }
  | { tag: 'Error'; value: Error }
  | { tag: 'UnknownTransaction' };

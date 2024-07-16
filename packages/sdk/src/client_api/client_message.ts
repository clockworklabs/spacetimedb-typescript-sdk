// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

// @ts-ignore
import { AlgebraicType, AlgebraicValue, SumTypeVariant } from "../index";
// @ts-ignore
import { CallReducer as __CallReducer } from "./call_reducer";
// @ts-ignore
import { Subscribe as __Subscribe } from "./subscribe";
// @ts-ignore
import { OneOffQuery as __OneOffQuery } from "./one_off_query";

export namespace ClientMessage {
  export function getAlgebraicType(): AlgebraicType {
    return AlgebraicType.createSumType([
      new SumTypeVariant("CallReducer", __CallReducer.getAlgebraicType()),
      new SumTypeVariant("Subscribe", __Subscribe.getAlgebraicType()),
      new SumTypeVariant("OneOffQuery", __OneOffQuery.getAlgebraicType()),
    ]);
  }

  export function serialize(value: ClientMessage): object {
    switch (value.tag) {
      case "CallReducer":
        return { CallReducer: __CallReducer.serialize(value.value) };
      case "Subscribe":
        return { Subscribe: __Subscribe.serialize(value.value) };
      case "OneOffQuery":
        return { OneOffQuery: __OneOffQuery.serialize(value.value) };
      default:
        throw "unreachable";
    }
  }

  export type CallReducer = { tag: "CallReducer"; value: __CallReducer };
  export const CallReducer = (value: __CallReducer): CallReducer => ({
    tag: "CallReducer",
    value,
  });
  export type Subscribe = { tag: "Subscribe"; value: __Subscribe };
  export const Subscribe = (value: __Subscribe): Subscribe => ({
    tag: "Subscribe",
    value,
  });
  export type OneOffQuery = { tag: "OneOffQuery"; value: __OneOffQuery };
  export const OneOffQuery = (value: __OneOffQuery): OneOffQuery => ({
    tag: "OneOffQuery",
    value,
  });

  export function fromValue(value: AlgebraicValue): ClientMessage {
    let sumValue = value.asSumValue();
    switch (sumValue.tag) {
      case 0:
        return {
          tag: "CallReducer",
          value: __CallReducer.fromValue(sumValue.value),
        };
      case 1:
        return {
          tag: "Subscribe",
          value: __Subscribe.fromValue(sumValue.value),
        };
      case 2:
        return {
          tag: "OneOffQuery",
          value: __OneOffQuery.fromValue(sumValue.value),
        };
      default:
        throw "unreachable";
    }
  }
}

export type ClientMessage =
  | ClientMessage.CallReducer
  | ClientMessage.Subscribe
  | ClientMessage.OneOffQuery;
export default ClientMessage;

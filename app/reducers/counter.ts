import { decrement, increment } from '../actions/counter';
import { Action } from "redux";

export type TState = number;

export default function counter(state: number = 0, action: Action) {
  if (increment.test(action)) {
    return state + 1;
  } else if (decrement.test(action)) {
    return state - 1;
  }

  return state;
}

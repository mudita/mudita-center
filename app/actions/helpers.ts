import { Action } from 'redux';

export interface IActionWithPayload<T> extends Action {
  readonly payload: T;
}

interface IActionCreator<T> {
  readonly type: string;
  (payload: T): IActionWithPayload<T>;

  test(action: Action): action is IActionWithPayload<T>;
}

interface IActionCreatorVoid {
  readonly type: string;
  (): Action;

  test(action: Action): action is Action;
}

export const actionCreator = <T>(type: string): IActionCreator<T> =>
  Object.assign((payload: T): any => ({ type, payload }), {
    type,
    test(action: Action): action is IActionWithPayload<T> {
      return action.type === type;
    }
  });

export const actionCreatorVoid = (type: string): IActionCreatorVoid =>
  Object.assign((): any => ({ type }), {
    type,
    test(action: Action): action is Action {
      return action.type === type;
    }
  });

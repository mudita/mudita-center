/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Action } from "redux"

export interface ActionWithPayload<T> extends Action {
  readonly payload: T
}

interface ActionCreator<T> {
  readonly type: string

  (payload: T): ActionWithPayload<T>

  test(action: Action): action is ActionWithPayload<T>
}

interface ActionNoPayload {
  readonly type: string

  (): Action

  test(action: Action): action is Action
}

export const actionCreator = <T>(type: string): ActionCreator<T> =>
  Object.assign((payload: T): any => ({ type, payload }), {
    type,
    test(action: Action): action is ActionWithPayload<T> {
      return action.type === type
    },
  })

export const actionCreatorVoid = (type: string): ActionNoPayload =>
  Object.assign((): any => ({ type }), {
    type,
    test(action: Action): action is Action {
      return action.type === type
    },
  })

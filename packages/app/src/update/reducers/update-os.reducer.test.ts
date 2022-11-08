/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import { UpdateError, UpdateOsEvent } from "App/update/constants"
import { updateOsReducer, initialState } from "App/update/reducers"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store"

test("empty event returns initial state", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect(updateOsReducer(undefined, {} as any)).toMatchInlineSnapshot(`
    Object {
      "error": null,
      "updatingState": null,
    }
  `)
})

describe("setUpdateState action", () => {
  test("action sets the updatin state", () => {
    expect(
      updateOsReducer(undefined, {
        type: UpdateOsEvent.SetUpdateState,
        payload: State.Loaded,
      })
    ).toEqual({
      ...initialState,
      updatingState: State.Loaded,
    })

    expect(
      updateOsReducer(undefined, {
        type: UpdateOsEvent.SetUpdateState,
        payload: State.Failed,
      })
    ).toEqual({
      ...initialState,
      updatingState: State.Failed,
    })
  })
})

describe("startUpdateOs action", () => {
  test("pending action sets proper updatingState", () => {
    expect(
      updateOsReducer(undefined, {
        type: pendingAction(UpdateOsEvent.StartOsUpdateProcess),
      })
    ).toEqual({
      ...initialState,
      updatingState: State.Loading,
    })
  })

  test("fulfilled action sets proper updatingState and clears error", () => {
    const error = new AppError(
      UpdateError.UpdateOsProcess,
      "Device updating process failed"
    )
    expect(
      updateOsReducer(
        {
          ...initialState,
          error,
        },
        {
          type: fulfilledAction(UpdateOsEvent.StartOsUpdateProcess),
        }
      )
    ).toEqual({
      ...initialState,
      updatingState: State.Loaded,
    })
  })
  test("rejected action sets proper updatingState and error", () => {
    const error = new AppError(
      UpdateError.UpdateOsProcess,
      "Device updating process failed"
    )
    expect(
      updateOsReducer(undefined, {
        type: rejectedAction(UpdateOsEvent.StartOsUpdateProcess),
        payload: error,
      })
    ).toEqual({
      ...initialState,
      updatingState: State.Failed,
      error: error,
    })
  })
})

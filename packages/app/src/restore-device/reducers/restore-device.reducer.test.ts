/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "App/core/errors"
import { readRestoreDeviceDataState } from "App/restore-device/actions"
import {
  RestoreDeviceError,
  RestoreDeviceEvent,
} from "App/restore-device/constants"
import { RestoreDeviceDataState } from "App/restore-device/reducers/restore-device.interface"
import {
  initialState,
  restoreDeviceReducer,
} from "App/restore-device/reducers/restore-device.reducer"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store/helpers/action.helper"

test("empty event returns initial state", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect(restoreDeviceReducer(undefined, {} as any)).toEqual(initialState)
})

describe("Start Restore Device functionality", () => {
  test("Event: StartRestoreDevice/pending change `state` to Running", () => {
    expect(
      restoreDeviceReducer(undefined, {
        type: pendingAction(RestoreDeviceEvent.StartRestoreDevice),
      })
    ).toEqual({
      ...initialState,
      state: RestoreDeviceDataState.Running,
    })
  })

  test("Event: StartRestoreDevice/fulfilled change `state` to Finished", () => {
    expect(
      restoreDeviceReducer(undefined, {
        type: fulfilledAction(RestoreDeviceEvent.StartRestoreDevice),
      })
    ).toEqual({
      ...initialState,
      state: RestoreDeviceDataState.Finished,
    })
  })

  test("Event: StartRestoreDevice/rejected change `state` to Error", () => {
    const errorMock = new AppError(
      RestoreDeviceError.StartRestoreDevice,
      "I'm error"
    )

    expect(
      restoreDeviceReducer(undefined, {
        type: rejectedAction(RestoreDeviceEvent.StartRestoreDevice),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      state: RestoreDeviceDataState.Error,
      error: errorMock,
    })
  })
})

describe("`ReadRestoreDeviceDataState` data functionality", () => {
  const errorMock = new AppError(
    RestoreDeviceError.StartRestoreDevice,
    "I'm error"
  )

  test("Event: `ReadRestoreDeviceDataState` set error property to null", () => {
    expect(
      restoreDeviceReducer(
        {
          ...initialState,
          error: errorMock,
        },
        readRestoreDeviceDataState
      )
    ).toEqual({
      ...initialState,
      state: RestoreDeviceDataState.Empty,
      error: null,
    })
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  restoreDeviceReducer,
  initialState,
} from "App/restore-device/reducers/restore-device.reducer"
import { RestoreDeviceEvent } from "App/restore-device/constants"
import { StartRestoreDeviceError } from "App/restore-device/errors"
import { RestoreDeviceDataState } from "App/restore-device/reducers/restore-device.interface"
import { readRestoreDeviceDataState } from "App/restore-device/actions"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "Renderer/store/helpers/action.helper"

test("empty event returns initial state", () => {
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
    const errorMock = new StartRestoreDeviceError("I'm error")

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
  const errorMock = new StartRestoreDeviceError("I'm error")

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

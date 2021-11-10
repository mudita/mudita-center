/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { pendingAction } from "Renderer/store/helpers"
import { unlockedDevice } from "./unlocked-device.action"
import { DeviceConnectionError } from "App/device/errors"
import { testError } from "App/renderer/store/constants"

jest.mock("App/renderer/requests/get-device-lock-time.request")
jest.mock("App/device/actions/base.action", () => ({
  setLockTime: jest.fn().mockReturnValue({
    type: "DEVICE_SET_LOCK_TIME",
    payload: undefined,
  }),
}))
jest.mock("App/device/actions/load-device-data.action", () => ({
  loadDeviceData: jest.fn().mockReturnValue({
    type: pendingAction("DEVICE_DATA_LOADING"),
    payload: undefined,
  }),
}))

test("fire async `unlockedDevice` doesn't call `loadDeviceData` action if device isn't `locked`", async () => {
  const mockStore = createMockStore([thunk])({
    device: {
      status: {
        unlocked: true,
      },
    },
  })

  const {
    meta: { requestId },
  } = await mockStore.dispatch(unlockedDevice() as unknown as AnyAction)

  expect(mockStore.getActions()).toEqual([
    unlockedDevice.pending(requestId),
    unlockedDevice.fulfilled(undefined, requestId),
  ])
})

test("fire async `unlockedDevice` returns `rejected` if `deviceType` is undefined", async () => {
  const mockStore = createMockStore([thunk])({
    device: {
      deviceType: undefined,
      status: {
        unlocked: false,
      },
    },
  })

  const errorMock = new DeviceConnectionError("Cannot connected to device")
  const {
    meta: { requestId },
  } = await mockStore.dispatch(unlockedDevice() as unknown as AnyAction)

  expect(mockStore.getActions()).toEqual([
    unlockedDevice.pending(requestId),
    unlockedDevice.rejected(testError, requestId, undefined, errorMock),
  ])
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { pendingAction } from "App/__deprecated__/renderer/store/helpers/action.helper"
import { DeviceError, DeviceEvent } from "App/device/constants"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { unlockedDevice } from "App/device/actions/unlocked-device.action"
import { AppError } from "App/core/errors"

jest.mock("App/__deprecated__/renderer/requests/get-device-lock-time.request")
jest.mock("App/device/actions/base.action", () => ({
  setLockTime: jest.fn().mockReturnValue({
    type: DeviceEvent.SetLockTime,
    payload: undefined,
  }),
}))
jest.mock("App/device/actions/load-device-data.action", () => ({
  loadDeviceData: jest.fn().mockReturnValue({
    type: pendingAction(DeviceEvent.Loading),
    payload: DeviceType.MuditaPure,
  }),
}))

test("fire async `unlockedDevice` call `loadDeviceData` action if device is `locked`", async () => {
  const mockStore = createMockStore([thunk])({
    device: {
      status: {
        unlocked: false,
      },
      deviceType: DeviceType.MuditaPure,
    },
    dataSync: {
      initialized: true,
    },
  })

  const {
    meta: { requestId },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(unlockedDevice() as unknown as AnyAction)

  expect(mockStore.getActions()).toEqual([
    unlockedDevice.pending(requestId),
    {
      type: pendingAction(DeviceEvent.Loading),
      payload: DeviceType.MuditaPure,
    },
    unlockedDevice.fulfilled(undefined, requestId),
  ])
})

test("fire async `unlockedDevice` call `readAllIndexes` action if `initialized` od DataSync is false", async () => {
  const mockStore = createMockStore([thunk])({
    device: {
      status: {
        unlocked: false,
      },
      deviceType: DeviceType.MuditaPure,
    },
    dataSync: {
      initialized: false,
    },
  })

  const {
    meta: { requestId },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(unlockedDevice() as unknown as AnyAction)

  expect(mockStore.getActions()).toEqual([
    unlockedDevice.pending(requestId),
    {
      type: pendingAction(DeviceEvent.Loading),
      payload: DeviceType.MuditaPure,
    },
    unlockedDevice.fulfilled(undefined, requestId),
  ])
})

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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
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

  const errorMock = new AppError(
    DeviceError.Connection,
    "Cannot connected to device"
  )
  const {
    meta: { requestId },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(unlockedDevice() as unknown as AnyAction)

  expect(mockStore.getActions()).toEqual([
    unlockedDevice.pending(requestId),
    unlockedDevice.rejected(testError, requestId, undefined, errorMock),
  ])
})

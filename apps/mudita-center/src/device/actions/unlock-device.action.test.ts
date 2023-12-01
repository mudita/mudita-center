/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { unlockDevice } from "./unlock-device.action"
import { unlockDeviceRequest } from "App/device/requests/unlock-device.request"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { pendingAction } from "App/__deprecated__/renderer/store/helpers/action.helper"
import { DeviceError, DeviceEvent, DeviceType } from "App/device/constants"

const mockStore = createMockStore([thunk])({
  device: {
    deviceType: DeviceType.MuditaPure,
  },
})

jest.mock("App/device/requests/unlock-device.request")

jest.mock("App/device/actions/connect-device.action", () => ({
  connectDevice: () => ({
    type: pendingAction(DeviceEvent.Connected),
    payload: undefined,
  }),
}))

afterEach(() => {
  mockStore.clearActions()
})

describe("Unlock Device request returns `success` status", () => {
  test("fire async `unlockDevice` with provided code", async () => {
    ;(unlockDeviceRequest as jest.Mock).mockReturnValueOnce(
      Result.success(true)
    )
    const codeMock = [1, 2, 3, 4]
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(unlockDevice(codeMock) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      unlockDevice.pending(requestId, codeMock),
      {
        type: pendingAction(DeviceEvent.Connected),
        payload: undefined,
      },
      unlockDevice.fulfilled(true, requestId, codeMock),
    ])

    expect(unlockDeviceRequest).toHaveBeenLastCalledWith(codeMock)
  })
})

describe("Unlock Device request returns `error` status", () => {
  test("fire async `unlockDevice` action and execute `rejected` event", async () => {
    ;(unlockDeviceRequest as jest.Mock).mockReturnValueOnce(
      Result.failed(new AppError("", ""))
    )
    const codeMock = [1, 2, 3, 4]
    const errorMock = new AppError(
      DeviceError.Unlocking,
      "Something went wrong during unlocking"
    )
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(unlockDevice(codeMock) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      unlockDevice.pending(requestId, codeMock),
      unlockDevice.rejected(testError, requestId, codeMock, errorMock),
    ])
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { unlockDevice } from "./unlock-device.action"
import { DeviceUnlockingError } from "App/device/errors"
import unlockDeviceRequest from "Renderer/requests/unlock-device.request"
import { testError } from "App/renderer/store/constants"

const mockStore = createMockStore([thunk])()

jest.mock("Renderer/requests/unlock-device.request")

afterEach(() => {
  mockStore.clearActions()
})

describe("Unlock Device request returns `success` status", () => {
  test("fire async `unlockDevice` with provided code", async () => {
    ;(unlockDeviceRequest as jest.Mock).mockReturnValueOnce({
      status: DeviceResponseStatus.Ok,
    })
    const codeMock = [1, 2, 3, 4]
    const {
      meta: { requestId },
    } = await mockStore.dispatch(unlockDevice(codeMock) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      unlockDevice.pending(requestId, codeMock),
      unlockDevice.fulfilled(DeviceResponseStatus.Ok, requestId, codeMock),
    ])

    expect(unlockDeviceRequest).toHaveBeenLastCalledWith(codeMock)
  })
})

describe("Unlock Device request returns `error` status", () => {
  test("fire async `unlockDevice` action and execute `rejected` event", async () => {
    ;(unlockDeviceRequest as jest.Mock).mockReturnValueOnce({
      status: DeviceResponseStatus.Error,
    })
    const codeMock = [1, 2, 3, 4]
    const errorMock = new DeviceUnlockingError(
      "Something went wrong during unlocking"
    )
    const {
      meta: { requestId },
    } = await mockStore.dispatch(unlockDevice(codeMock) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      unlockDevice.pending(requestId, codeMock),
      unlockDevice.rejected(testError, requestId, codeMock, errorMock),
    ])
  })
})

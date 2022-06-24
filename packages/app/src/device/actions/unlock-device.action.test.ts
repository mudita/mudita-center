/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { unlockDevice } from "./unlock-device.action"
import { DeviceUnlockingError } from "App/device/errors"
import unlockDeviceRequest from "App/__deprecated__/renderer/requests/unlock-device.request"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

const mockStore = createMockStore([thunk])()

jest.mock("App/__deprecated__/renderer/requests/unlock-device.request")

afterEach(() => {
  mockStore.clearActions()
})

describe("Unlock Device request returns `success` status", () => {
  test("fire async `unlockDevice` with provided code", async () => {
    ;(unlockDeviceRequest as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
    })
    const codeMock = [1, 2, 3, 4]
    const {
      meta: { requestId },
    } = await mockStore.dispatch(unlockDevice(codeMock) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      unlockDevice.pending(requestId, codeMock),
      unlockDevice.fulfilled(RequestResponseStatus.Ok, requestId, codeMock),
    ])

    expect(unlockDeviceRequest).toHaveBeenLastCalledWith(codeMock)
  })
})

describe("Unlock Device request returns `error` status", () => {
  test("fire async `unlockDevice` action and execute `rejected` event", async () => {
    ;(unlockDeviceRequest as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Error,
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

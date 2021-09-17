/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { getUnlockStatus } from "./get-unlock-status.action"
import { DeviceLockedError } from "App/device/errors"
import getUnlockDeviceStatusRequest from "Renderer/requests/get-unlock-device-status.request"
import { testError } from "App/renderer/store/constants"

const mockStore = createMockStore([thunk])()

jest.mock("Renderer/requests/get-unlock-device-status.request")

afterEach(() => {
  mockStore.clearActions()
})

describe("Get Unlock Device Status request returns `success` status", () => {
  test("fire async `getUnlockStatus`", async () => {
    ;(getUnlockDeviceStatusRequest as jest.Mock).mockReturnValueOnce({
      status: DeviceResponseStatus.Ok,
    })
    const {
      meta: { requestId },
    } = await mockStore.dispatch(getUnlockStatus() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      getUnlockStatus.pending(requestId),
      getUnlockStatus.fulfilled(DeviceResponseStatus.Ok, requestId, undefined),
    ])

    expect(getUnlockDeviceStatusRequest).toHaveBeenCalled()
  })
})

describe("Get Unlock Device Status request returns `error` status", () => {
  test("fire async `getUnlockStatus` action and execute `rejected` event", async () => {
    ;(getUnlockDeviceStatusRequest as jest.Mock).mockReturnValueOnce({
      status: DeviceResponseStatus.Error,
    })
    const errorMock = new DeviceLockedError("Device is locked")
    const {
      meta: { requestId },
    } = await mockStore.dispatch(getUnlockStatus() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      getUnlockStatus.pending(requestId),
      getUnlockStatus.rejected(testError, requestId, undefined, errorMock),
    ])
  })
})

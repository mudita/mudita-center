/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { getUnlockStatus } from "./get-unlock-status.action"
import getUnlockDeviceStatusRequest from "App/__deprecated__/renderer/requests/get-unlock-device-status.request"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { DeviceError } from "App/device/constants"
import { AppError } from "App/core/errors"

const mockStore = createMockStore([thunk])()

jest.mock(
  "App/__deprecated__/renderer/requests/get-unlock-device-status.request"
)

afterEach(() => {
  mockStore.clearActions()
})

describe("Get Unlock Device Status request returns `success` status", () => {
  test("fire async `getUnlockStatus`", async () => {
    ;(getUnlockDeviceStatusRequest as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
    })
    const {
      meta: { requestId },
    } = await mockStore.dispatch(getUnlockStatus() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      getUnlockStatus.pending(requestId),
      getUnlockStatus.fulfilled(RequestResponseStatus.Ok, requestId, undefined),
    ])

    expect(getUnlockDeviceStatusRequest).toHaveBeenCalled()
  })
})

describe("Get Unlock Device Status request returns `error` status", () => {
  test("fire async `getUnlockStatus` action and execute `rejected` event", async () => {
    ;(getUnlockDeviceStatusRequest as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Error,
    })
    const errorMock = new AppError(DeviceError.Locked, "Device is locked")
    const {
      meta: { requestId },
    } = await mockStore.dispatch(getUnlockStatus() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      getUnlockStatus.pending(requestId),
      getUnlockStatus.rejected(testError, requestId, undefined, errorMock),
    ])
  })
})

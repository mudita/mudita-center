/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { getUnlockStatus } from "./get-unlock-status.action"
import { unlockDeviceStatusRequest } from "App/device/requests/unlock-device-status.request"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { DeviceError } from "App/device/constants"

const mockStore = createMockStore([thunk])()

jest.mock("App/device/requests/unlock-device-status.request")

afterEach(() => {
  mockStore.clearActions()
})

describe("Get Unlock Device Status request returns `success` status", () => {
  test("fire async `getUnlockStatus`", async () => {
    ;(unlockDeviceStatusRequest as jest.Mock).mockReturnValueOnce(
      Result.success(undefined)
    )
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(getUnlockStatus() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      getUnlockStatus.pending(requestId),
      getUnlockStatus.fulfilled(true, requestId, undefined),
    ])

    expect(unlockDeviceStatusRequest).toHaveBeenCalled()
  })
})

describe("Get Unlock Device Status request returns `error` status", () => {
  test("fire async `getUnlockStatus` action and execute `rejected` event", async () => {
    ;(unlockDeviceStatusRequest as jest.Mock).mockReturnValueOnce(
      Result.failed(new AppError("", ""))
    )
    const errorMock = new AppError(DeviceError.Locked, "Device is locked")
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(getUnlockStatus() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      getUnlockStatus.pending(requestId),
      getUnlockStatus.rejected(testError, requestId, undefined, errorMock),
    ])
  })
})

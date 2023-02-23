/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { DeviceType } from "App/device/constants"
import { AnyAction } from "@reduxjs/toolkit"
import { pendingAction } from "App/__deprecated__/renderer/store/helpers"
import { getConnectedDevice } from "App/device/actions/get-connected-device.action"
import { connectDeviceRequest } from "App/device/requests/connect-device.request"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { AppError } from "App/core/errors"
import { Result } from "App/core/builder"
import { DeviceError } from "App/device/constants"

const mockStore = createMockStore([thunk])()

jest.mock("App/device/requests/connect-device.request")

jest.mock("App/device/actions/connect-device.action", () => ({
  connectDevice: jest.fn().mockReturnValue({
    type: pendingAction("DEVICE_CONNECTED"),
    payload: undefined,
  }),
}))

afterEach(() => {
  mockStore.clearActions()
})

describe("Get Connected Device request returns `success` status without `data`", () => {
  test("fire async `getConnectedDevice` and dispatch `connectDevice` action", async () => {
    ;(connectDeviceRequest as jest.Mock).mockReturnValueOnce(Result.success(""))

    const errorMock = new AppError(
      DeviceError.Connection,
      "Cannot connected to device"
    )
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(getConnectedDevice() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      getConnectedDevice.pending(requestId),
      getConnectedDevice.rejected(testError, requestId, undefined, errorMock),
    ])
  })
})

describe("Get Connected Device request returns `success` status within `data`", () => {
  test("fire async `getConnectedDevice` and dispatch `connectDevice` action", async () => {
    ;(connectDeviceRequest as jest.Mock).mockReturnValueOnce(
      Result.success({
        deviceType: DeviceType.MuditaPure,
      })
    )

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(getConnectedDevice() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      getConnectedDevice.pending(requestId),
      getConnectedDevice.fulfilled(undefined, requestId, undefined),
    ])

    expect(connectDeviceRequest).toHaveBeenCalled()
  })
})

describe("Get Connected Device request returns `error` status", () => {
  test("fire async `getConnectedDevice` action and execute `rejected` event", async () => {
    ;(connectDeviceRequest as jest.Mock).mockReturnValueOnce(
      Result.failed(new AppError("", ""))
    )
    const errorMock = new AppError(
      DeviceError.Connection,
      "Cannot connected to device"
    )
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(getConnectedDevice() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      getConnectedDevice.pending(requestId),
      getConnectedDevice.rejected(testError, requestId, undefined, errorMock),
    ])
  })
})

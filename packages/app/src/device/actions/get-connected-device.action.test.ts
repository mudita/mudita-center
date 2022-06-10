/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { DeviceType } from "@mudita/pure"
import { AnyAction } from "@reduxjs/toolkit"
import { pendingAction } from "App/__deprecated__/renderer/store/helpers"
import { getConnectedDevice } from "./get-connected-device.action"
import { DeviceConnectionError } from "App/device/errors"
import connectDeviceRequest from "App/__deprecated__/renderer/requests/connect-device.request"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

const mockStore = createMockStore([thunk])()

jest.mock("App/__deprecated__/renderer/requests/connect-device.request")

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
    ;(connectDeviceRequest as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
    })

    const errorMock = new DeviceConnectionError("Cannot connected to device")
    const {
      meta: { requestId },
    } = await mockStore.dispatch(getConnectedDevice() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      getConnectedDevice.pending(requestId),
      getConnectedDevice.rejected(testError, requestId, undefined, errorMock),
    ])
  })
})

describe("Get Connected Device request returns `success` status within `data`", () => {
  test("fire async `getConnectedDevice` and dispatch `connectDevice` action", async () => {
    ;(connectDeviceRequest as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
      data: {
        deviceType: DeviceType.MuditaPure,
      },
    })

    const {
      meta: { requestId },
    } = await mockStore.dispatch(getConnectedDevice() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      getConnectedDevice.pending(requestId),
      {
        type: pendingAction("DEVICE_CONNECTED"),
        payload: undefined,
      },
      getConnectedDevice.fulfilled(undefined, requestId, undefined),
    ])

    expect(connectDeviceRequest).toHaveBeenCalled()
  })
})

describe("Get Connected Device request returns `error` status", () => {
  test("fire async `getConnectedDevice` action and execute `rejected` event", async () => {
    ;(connectDeviceRequest as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Error,
    })
    const errorMock = new DeviceConnectionError("Cannot connected to device")
    const {
      meta: { requestId },
    } = await mockStore.dispatch(getConnectedDevice() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      getConnectedDevice.pending(requestId),
      getConnectedDevice.rejected(testError, requestId, undefined, errorMock),
    ])
  })
})

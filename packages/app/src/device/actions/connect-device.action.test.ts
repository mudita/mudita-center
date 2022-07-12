/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { DeviceType } from "@mudita/pure"
import { pendingAction } from "App/__deprecated__/renderer/store/helpers"
import { connectDevice } from "./connect-device.action"
import { ConnectionState, DeviceError } from "App/device/constants"
import connectDeviceRequest from "App/__deprecated__/renderer/requests/connect-device.request"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { AppError } from "App/core/errors"

const mockStore = createMockStore([thunk])({
  device: {
    state: ConnectionState.Empty,
  },
})

jest.mock("App/__deprecated__/renderer/requests/get-device-info.request", () =>
  jest.fn().mockReturnValue({
    status: RequestResponseStatus.Ok,
  })
)
jest.mock("App/__deprecated__/renderer/requests/get-network-info.request", () =>
  jest.fn().mockReturnValue({
    status: RequestResponseStatus.Ok,
  })
)
jest.mock("App/__deprecated__/renderer/requests/get-storage-info.request", () =>
  jest.fn().mockReturnValue({
    status: RequestResponseStatus.Ok,
  })
)
jest.mock("App/__deprecated__/renderer/requests/get-battery-info.request", () =>
  jest.fn().mockReturnValue({
    status: RequestResponseStatus.Ok,
  })
)
jest.mock("App/device/actions/load-device-data.action", () => ({
  loadDeviceData: jest.fn().mockReturnValue({
    type: pendingAction("DEVICE_DATA_LOADING"),
    payload: undefined,
  }),
}))
jest.mock("App/device/actions/set-connection-status.action", () => ({
  setConnectionStatus: jest.fn().mockReturnValue({
    type: pendingAction("DEVICE_SET_CONNECTION_STATE"),
    payload: true,
  }),
}))
jest.mock("App/__deprecated__/renderer/requests/connect-device.request")

afterEach(() => {
  mockStore.clearActions()
})

describe("Connect Device request returns `success` status", () => {
  test("fire async `connectDevice` action and execute `SetSimData` event", async () => {
    ;(connectDeviceRequest as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
    })

    const {
      meta: { requestId },
    } = await mockStore.dispatch(
      connectDevice(DeviceType.MuditaPure) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      connectDevice.pending(requestId, DeviceType.MuditaPure),
      {
        type: pendingAction("DEVICE_SET_CONNECTION_STATE"),
        payload: true,
      },
      {
        type: pendingAction("DEVICE_DATA_LOADING"),
        payload: undefined,
      },
      connectDevice.fulfilled(
        DeviceType.MuditaPure,
        requestId,
        DeviceType.MuditaPure
      ),
    ])

    expect(connectDeviceRequest).toHaveBeenCalled()
  })
})

describe("Connect Device request returns `error` status", () => {
  test("fire async `connectDevice` action and execute `rejected` event", async () => {
    ;(connectDeviceRequest as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Error,
    })

    const errorMock = new AppError(
      DeviceError.Connection,
      "Cannot connected to device"
    )
    const {
      meta: { requestId },
    } = await mockStore.dispatch(
      connectDevice(DeviceType.MuditaPure) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      connectDevice.pending(requestId, DeviceType.MuditaPure),
      connectDevice.rejected(
        testError,
        requestId,
        DeviceType.MuditaPure,
        errorMock
      ),
    ])
  })
})

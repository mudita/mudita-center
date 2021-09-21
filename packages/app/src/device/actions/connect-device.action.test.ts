/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { DeviceType } from "@mudita/pure"
import { pendingAction } from "Renderer/store/helpers"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { connectDevice } from "./connect-device.action"
import { ConnectionState } from "App/device/constants"
import { DeviceConnectionError } from "App/device/errors"
import connectDeviceRequest from "Renderer/requests/connect-device.request"
import { testError } from "App/renderer/store/constants"

const mockStore = createMockStore([thunk])({
  device: {
    state: ConnectionState.Empty,
  },
})

jest.mock("Renderer/requests/get-device-info.request", () =>
  jest.fn().mockReturnValue({
    status: DeviceResponseStatus.Ok,
  })
)
jest.mock("Renderer/requests/get-network-info.request", () =>
  jest.fn().mockReturnValue({
    status: DeviceResponseStatus.Ok,
  })
)
jest.mock("Renderer/requests/get-storage-info.request", () =>
  jest.fn().mockReturnValue({
    status: DeviceResponseStatus.Ok,
  })
)
jest.mock("Renderer/requests/get-battery-info.request", () =>
  jest.fn().mockReturnValue({
    status: DeviceResponseStatus.Ok,
  })
)
jest.mock("Renderer/requests/get-backups-info.request", () =>
  jest.fn().mockReturnValue({
    status: DeviceResponseStatus.Ok,
  })
)
jest.mock("App/device/actions/load-device-data.action", () => ({
  loadDeviceData: jest.fn().mockReturnValue({
    type: pendingAction("DEVICE_DATA_LOADING"),
    payload: undefined,
  }),
}))
jest.mock("Renderer/requests/connect-device.request")

afterEach(() => {
  mockStore.clearActions()
})

describe("Connect Device request returns `success` status", () => {
  test("fire async `connectDevice` action and execute `SetSimData` event", async () => {
    ;(connectDeviceRequest as jest.Mock).mockReturnValueOnce({
      status: DeviceResponseStatus.Ok,
    })

    const {
      meta: { requestId },
    } = await mockStore.dispatch(
      connectDevice(DeviceType.MuditaPure) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      connectDevice.pending(requestId, DeviceType.MuditaPure),
      {
        payload: true,
        type: "DEVICE_SET_CONNECTION_STATE",
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
      status: DeviceResponseStatus.Error,
    })

    const errorMock = new DeviceConnectionError("Cannot connected to device")
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

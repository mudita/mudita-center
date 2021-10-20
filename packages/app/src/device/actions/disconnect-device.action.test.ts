/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { UpdatingState } from "App/device/constants"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { disconnectDevice } from "App/device/actions/disconnect-device.action"
import { DeviceDisconnectionError } from "App/device/errors"
import disconnectDeviceRequest from "Renderer/requests/disconnect-device.request"
import { testError } from "App/renderer/store/constants"

const mockStore = createMockStore([thunk])({
  device: {
    updatingState: null,
  },
})

jest.mock("Renderer/requests/disconnect-device.request")

afterEach(() => {
  mockStore.clearActions()
})

describe("Device with updatingState different than `null`", () => {
  test("do not call `disconnectDevice`", async () => {
    const store = createMockStore([thunk])({
      device: {
        updatingState: UpdatingState.Updating,
      },
    })

    await store.dispatch(disconnectDevice() as unknown as AnyAction)

    expect(disconnectDeviceRequest).not.toHaveBeenCalled()
  })
})

describe("Disconnect Device request returns `success` status", () => {
  test("fire async `disconnectDevice`", async () => {
    ;(disconnectDeviceRequest as jest.Mock).mockReturnValueOnce({
      status: DeviceResponseStatus.Ok,
    })
    const {
      meta: { requestId },
    } = await mockStore.dispatch(disconnectDevice() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      disconnectDevice.pending(requestId),
      {
        payload: false,
        type: "DEVICE_SET_CONNECTION_STATE",
      },
      disconnectDevice.fulfilled(undefined, requestId, undefined),
    ])

    expect(disconnectDeviceRequest).toHaveBeenCalled()
  })
})

describe("Disconnect Device request returns `error` status", () => {
  test("fire async `disconnectDevice` action and execute `rejected` event", async () => {
    ;(disconnectDeviceRequest as jest.Mock).mockReturnValueOnce({
      status: DeviceResponseStatus.Error,
    })
    const errorMock = new DeviceDisconnectionError(
      "Cannot disconnect from device"
    )
    const {
      meta: { requestId },
    } = await mockStore.dispatch(disconnectDevice() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      disconnectDevice.pending(requestId),
      disconnectDevice.rejected(testError, requestId, undefined, errorMock),
    ])
  })
})

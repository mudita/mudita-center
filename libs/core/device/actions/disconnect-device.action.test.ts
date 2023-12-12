/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { pendingAction } from "Core/__deprecated__/renderer/store/helpers"
import { disconnectDevice } from "Core/device/actions/disconnect-device.action"

const mockStore = createMockStore([thunk])()

jest.mock("Core/device/actions/set-connection-status.action", () => ({
  setConnectionStatus: jest.fn().mockReturnValue({
    type: pendingAction("DEVICE_SET_CONNECTION_STATE"),
    payload: false,
  }),
}))

afterEach(() => {
  mockStore.clearActions()
})

describe("Disconnect Device request returns `success` status", () => {
  test("fire async `disconnectDevice`", async () => {
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(disconnectDevice() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      disconnectDevice.pending(requestId),
      {
        type: pendingAction("DEVICE_SET_CONNECTION_STATE"),
        payload: false,
      },
      disconnectDevice.fulfilled(undefined, requestId, undefined),
    ])
  })
})

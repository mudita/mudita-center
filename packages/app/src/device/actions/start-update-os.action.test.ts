/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { pendingAction } from "App/__deprecated__/renderer/store/helpers"
import { startUpdateOs } from "./start-update-os.action"
import { DeviceUpdateProcessError } from "App/device/errors"
import updateOs from "App/__deprecated__/renderer/requests/update-os.request"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

const mockStore = createMockStore([thunk])()

jest.mock("App/__deprecated__/renderer/requests/update-os.request")
jest.mock("App/device-file-system", () => ({
  removeFile: jest.fn().mockReturnValue({
    type: pendingAction("DEVICE_FILE_SYSTEM_REMOVE"),
    payload: undefined,
  }),
}))
afterEach(() => {
  mockStore.clearActions()
})

describe("Update Os request returns `success` status", () => {
  test("fire async `startUpdateOs`", async () => {
    ;(updateOs as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
    })
    const filePathMock = "far/far/far/in/some/catalog/update.img"
    const {
      meta: { requestId },
    } = await mockStore.dispatch(
      startUpdateOs(filePathMock) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      startUpdateOs.pending(requestId, filePathMock),
      {
        payload: undefined,
        type: "DEVICE_FILE_SYSTEM_REMOVE/pending",
      },
      startUpdateOs.fulfilled(
        RequestResponseStatus.Ok,
        requestId,
        filePathMock
      ),
    ])

    expect(updateOs).toHaveBeenLastCalledWith(filePathMock)
  })
})

describe("Update Os request returns `error` status", () => {
  test("fire async `startUpdateOs` action and execute `rejected` event", async () => {
    ;(updateOs as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Error,
    })
    const filePathMock = "far/far/far/in/some/catalog/update.img"
    const errorMock = new DeviceUpdateProcessError(
      "Device updating process failed"
    )
    const {
      meta: { requestId },
    } = await mockStore.dispatch(
      startUpdateOs(filePathMock) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      startUpdateOs.pending(requestId, filePathMock),
      {
        payload: undefined,
        type: "DEVICE_FILE_SYSTEM_REMOVE/pending",
      },
      startUpdateOs.rejected(testError, requestId, filePathMock, errorMock),
    ])
  })
})

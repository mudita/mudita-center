/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { startUpdateOs } from "./start-update-os.action"
import { DeviceUpdateProcessError } from "App/device/errors"
import updateOs from "Renderer/requests/update-os.request"

const mockStore = createMockStore([thunk])()

jest.mock("Renderer/requests/update-os.request")

afterEach(() => {
  mockStore.clearActions()
})

describe("Update Os request returns `success` status", () => {
  test("fire async `startUpdateOs`", async () => {
    ;(updateOs as jest.Mock).mockReturnValueOnce({
      status: DeviceResponseStatus.Ok,
    })
    const filePathMock = "far/far/far/in/some/catalog/update.img"
    const {
      meta: { requestId },
    } = await mockStore.dispatch(
      startUpdateOs(filePathMock) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      startUpdateOs.pending(requestId, filePathMock),
      startUpdateOs.fulfilled(DeviceResponseStatus.Ok, requestId, filePathMock),
    ])

    expect(updateOs).toHaveBeenLastCalledWith(filePathMock)
  })
})

describe("Update Os request returns `error` status", () => {
  test("fire async `startUpdateOs` action and execute `rejected` event", async () => {
    ;(updateOs as jest.Mock).mockReturnValueOnce({
      status: DeviceResponseStatus.Error,
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
      startUpdateOs.rejected(
        "Rejected" as unknown as Error,
        requestId,
        filePathMock,
        errorMock
      ),
    ])
  })
})

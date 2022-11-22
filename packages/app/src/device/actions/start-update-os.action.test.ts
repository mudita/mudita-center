/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { Result } from "App/core/builder"
import { pendingAction } from "App/__deprecated__/renderer/store/helpers"
import { startUpdateOs } from "./start-update-os.action"
import { startOsUpdate } from "App/update/requests/start-os-update.request"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { AppError } from "App/core/errors"
import { DeviceError } from "App/device/constants"

const mockStore = createMockStore([thunk])()

jest.mock("App/update/requests/start-os-update.request")
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
    ;(startOsUpdate as jest.Mock).mockReturnValueOnce(Result.success(true))

    const filePathMock = "far/far/far/in/some/catalog/update.img"
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      startUpdateOs(filePathMock) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      startUpdateOs.pending(requestId, filePathMock),
      {
        payload: undefined,
        type: "DEVICE_FILE_SYSTEM_REMOVE/pending",
      },
      startUpdateOs.fulfilled(true, requestId, filePathMock),
    ])

    expect(startOsUpdate).toHaveBeenLastCalledWith({ fileName: filePathMock })
  })
})

describe("Update Os request returns `error` status", () => {
  test("fire async `startUpdateOs` action and execute `rejected` event", async () => {
    const errorMock = new AppError(
      DeviceError.UpdateProcess,
      "Device updating process failed"
    )

    ;(startOsUpdate as jest.Mock).mockReturnValueOnce(Result.failed(errorMock))
    const filePathMock = "far/far/far/in/some/catalog/update.img"

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
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

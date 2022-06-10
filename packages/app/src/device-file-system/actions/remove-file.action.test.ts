/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { removeFileRequest } from "App/device-file-system/requests"
import { removeFile } from "./remove-file.action"
import { DeviceFileRemovingError } from "App/device-file-system/errors"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

const mockStore = createMockStore([thunk])()

const filePathMock = "C:/MuditaOs/files"

jest.mock("App/device-file-system/requests")

afterEach(() => {
  mockStore.clearActions()
})

describe("Remove File request returns `success` status", () => {
  test("fire async `removeFile` actions returns `undefined`", async () => {
    ;(removeFileRequest as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
    })

    const {
      meta: { requestId },
    } = await mockStore.dispatch(
      removeFile(filePathMock) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      removeFile.pending(requestId, filePathMock),
      removeFile.fulfilled(undefined, requestId, filePathMock),
    ])

    expect(removeFileRequest).toHaveBeenCalled()
  })
})

describe("Remove File request returns `error` status", () => {
  test("fire async `removeFile` action and execute `rejected` event", async () => {
    ;(removeFileRequest as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Error,
    })

    const {
      meta: { requestId },
    } = await mockStore.dispatch(
      removeFile(filePathMock) as unknown as AnyAction
    )
    const errorMock = new DeviceFileRemovingError("Cannot remove the file")

    expect(mockStore.getActions()).toEqual([
      removeFile.pending(requestId, filePathMock),
      removeFile.rejected(testError, requestId, filePathMock, errorMock),
    ])
  })
})

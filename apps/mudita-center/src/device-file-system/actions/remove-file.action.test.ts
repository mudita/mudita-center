/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { Result } from "App/core/builder"
import { removeFileRequest } from "App/device-file-system/requests/remove-file.request"
import { removeFile } from "./remove-file.action"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { AppError } from "App/core/errors"
import { DeviceFileSystemError } from "App/device-file-system/constants"

const mockStore = createMockStore([thunk])()

const filePathMock = "C:/MuditaOs/files"

jest.mock("App/device-file-system/requests/remove-file.request")

afterEach(() => {
  mockStore.clearActions()
})

describe("Remove File request returns `success` status", () => {
  test("fire async `removeFile` actions returns `undefined`", async () => {
    ;(removeFileRequest as jest.Mock).mockReturnValueOnce(Result.success(true))

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
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
    ;(removeFileRequest as jest.Mock).mockReturnValueOnce(Result.success(false))

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      removeFile(filePathMock) as unknown as AnyAction
    )
    const errorMock = new AppError(
      DeviceFileSystemError.Removing,
      "Cannot remove the file"
    )

    expect(mockStore.getActions()).toEqual([
      removeFile.pending(requestId, filePathMock),
      removeFile.rejected(testError, requestId, filePathMock, errorMock),
    ])
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { pendingAction } from "App/__deprecated__/renderer/store/helpers"
import { deleteFilesRequest } from "App/files-manager/requests/delete-files.request"
import { initialState } from "App/files-manager/reducers"
import { FailedResult, SuccessResult } from "App/core/builder"
import { deleteFiles } from "App/files-manager/actions/delete-files.action"
import { AppError } from "App/core/errors"
import { testError } from "App/__deprecated__/renderer/store/constants"

jest.mock("App/files-manager/requests/delete-files.request")
jest.mock("App/device/actions/load-storage-info.action", () => ({
  loadStorageInfoAction: jest.fn().mockReturnValue({
    type: pendingAction("DEVICE_LOAD_STORAGE_INFO"),
    payload: undefined,
  }),
}))

const filePaths = [
  "user/music/example_file_name.mp3",
  "user/music/second_example_file_name.wav",
]

const successObjectResult: SuccessResult<string[]> = new SuccessResult(
  filePaths
)

const errorMock = new AppError("SOME_ERROR_TYPE", "Luke, I'm your error")
const failedObjectResult = new FailedResult({
  ...errorMock,
})

describe("when `deleteFiles` request return success result", () => {
  test("returns string list", async () => {
    ;(deleteFilesRequest as jest.Mock).mockReturnValue(successObjectResult)
    const mockStore = createMockStore([thunk])({
      filesManager: initialState,
    })
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(deleteFiles(filePaths) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      deleteFiles.pending(requestId, filePaths),
      {
        type: pendingAction("DEVICE_LOAD_STORAGE_INFO"),
        payload: undefined,
      },
      deleteFiles.fulfilled(successObjectResult.data, requestId, filePaths),
    ])

    expect(deleteFilesRequest).toHaveBeenCalled()
  })
})

describe("when `deleteFiles` request return failed result", () => {
  test("returns error", async () => {
    ;(deleteFilesRequest as jest.Mock).mockReturnValue(failedObjectResult)
    const mockStore = createMockStore([thunk])({
      filesManager: initialState,
    })
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(deleteFiles(filePaths) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      deleteFiles.pending(requestId, filePaths),
      deleteFiles.rejected(testError, requestId, filePaths, { ...errorMock }),
    ])

    expect(deleteFilesRequest).toHaveBeenCalled()
  })
})

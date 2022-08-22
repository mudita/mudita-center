/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { SuccessResult, FailedResult } from "App/core/builder"
import { AppError } from "App/core/errors"
import { getFilesRequest } from "App/files-manager/requests/get-files.request"
import { initialState } from "App/files-manager/reducers"
import { File } from "App/files-manager/dto"
import { getFiles } from "App/files-manager/actions"
import { DeviceDirectory } from "App/files-manager/constants"

jest.mock("App/files-manager/requests/get-files.request")

const successObjectResult: SuccessResult<File[]> = new SuccessResult([
  {
    id: "user/music/example_file_name.mp3",
    size: 1234,
    name: "example_file_name.mp3",
    type: "mp3",
  },
  {
    id: "user/music/second_example_file_name.wav",
    size: 12345,
    name: "second_example_file_name.wav",
    type: "wav",
  },
])

const errorMock = new AppError("SOME_ERROR_TYPE", "Luke, I'm your error")

const failedObjectResult: FailedResult = new FailedResult(errorMock)

afterEach(() => {
  jest.resetAllMocks()
})

describe("when `getFiles` request return success result", () => {
  test("returns files list", async () => {
    ;(getFilesRequest as jest.Mock).mockReturnValue(successObjectResult)
    const mockStore = createMockStore([thunk])({
      filesManager: initialState,
    })
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      getFiles(DeviceDirectory.Music) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      getFiles.pending(requestId, DeviceDirectory.Music),
      getFiles.fulfilled(
        successObjectResult.data,
        requestId,
        DeviceDirectory.Music
      ),
    ])

    expect(getFilesRequest).toHaveBeenCalled()
  })
})

describe("when `getFiles` request return error", () => {
  test("returns files list", async () => {
    ;(getFilesRequest as jest.Mock).mockReturnValue(failedObjectResult)
    const mockStore = createMockStore([thunk])({
      filesManager: initialState,
    })
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      getFiles(DeviceDirectory.Music) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      getFiles.pending(requestId, DeviceDirectory.Music),
      getFiles.rejected(
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        successObjectResult.error!,
        requestId,
        DeviceDirectory.Music,
        errorMock
      ),
    ])

    expect(getFilesRequest).toHaveBeenCalled()
  })
})

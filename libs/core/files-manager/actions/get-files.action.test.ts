/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { getFilesRequest } from "Core/files-manager/requests/get-files.request"
import { initialState } from "Core/files-manager/reducers"
import { File } from "Core/files-manager/dto"
import { getFiles } from "Core/files-manager/actions"
import { DeviceDirectory } from "Core/files-manager/constants"
import { testError } from "Core/__deprecated__/renderer/store/constants"

jest.mock("Core/files-manager/requests/get-files.request")

const successObjectResult: ResultObject<File[]> = Result.success([
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

const failedObjectResult: ResultObject<AppError> = Result.failed(errorMock)

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
        testError,
        requestId,
        DeviceDirectory.Music,
        failedObjectResult.error
      ),
    ])

    expect(getFilesRequest).toHaveBeenCalled()
  })
})

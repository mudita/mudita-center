/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { getFilesRequest } from "App/files-manager/requests/get-files.request"
import { initialState, MetadataDeviceFile } from "App/files-manager/reducers"
import { FilesManagerEvent } from "App/files-manager/constants"
import { getFiles } from "App/files-manager/actions"
import { GetFilesError } from "App/files-manager/errors"
import { RequestResponse, RequestResponseStatus } from "App/core/types"

jest.mock("App/files-manager/requests/get-files.request")

const successObjectResult: RequestResponse<MetadataDeviceFile[]> = {
  status: RequestResponseStatus.Ok,
  data: [
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
  ],
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `getFiles` ", () => {
  describe("when `getFiles` request return success", () => {
    test("fire async `getFiles` call `setFiles`", async () => {
      ;(getFilesRequest as jest.Mock).mockReturnValue(successObjectResult)
      const mockStore = createMockStore([thunk])({
        filesManager: initialState,
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(getFiles() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        getFiles.pending(requestId),
        {
          type: FilesManagerEvent.SetFiles,
          payload: successObjectResult.data,
        },
        getFiles.fulfilled(successObjectResult.data!, requestId),
      ])

      expect(getFilesRequest).toHaveBeenCalled()
    })
  })

  describe("when `getFiles` request return error", () => {
    test("fire async `getFiles` returns `rejected` action", async () => {
      ;(getFilesRequest as jest.Mock).mockReturnValue({ success: false })
      const errorMock = new GetFilesError("Get files request failed")
      const mockStore = createMockStore([thunk])({
        filesManager: initialState,
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(getFiles() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        getFiles.pending(requestId),
        getFiles.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(getFilesRequest).toHaveBeenCalled()
    })
  })
})

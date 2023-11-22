/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { State } from "App/core/constants"
import { Result, SuccessResult } from "App/core/builder"
import { AppError } from "App/core/errors"
import { pendingAction } from "App/__deprecated__/renderer/store/helpers"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { uploadFilesRequest } from "App/files-manager/requests"
import { DeviceDirectory } from "App/files-manager/constants/device-directory.constant"
import { uploadFile } from "App/files-manager/actions/upload-file.action"
import {
  setUploadBlocked,
  setUploadingFileCount,
  setUploadingState,
} from "App/files-manager/actions/base.action"
import { getFiles } from "App/files-manager/actions/get-files.action"
import { getPathsRequest } from "App/file-system/requests"

jest.mock("App/file-system/requests/get-paths.request")
jest.mock("App/files-manager/requests")

const GET_FILES_MOCK_RESULT = {
  type: pendingAction("FILES_MANAGER_GET_FILES"),
  payload: undefined,
}

jest.mock("App/files-manager/actions/get-files.action")

jest.mock("App/device/actions/load-storage-info.action", () => ({
  loadStorageInfoAction: jest.fn().mockReturnValue({
    type: pendingAction("DEVICE_LOAD_STORAGE_INFO"),
    payload: undefined,
  }),
}))


const pathsMock = ["/path/file-1.mp3", "/path/file-2.wav"]
const errorMock = new AppError("SOME_ERROR_TYPE", "Luke, I'm your error")
const successGetPathResponse = new SuccessResult<string[]>(pathsMock)
const successUploadResponse = new SuccessResult<string[]>(pathsMock)
const failedUploadResponse = Result.failed(errorMock)
const initialStore = {
  device: {
    deviceType: DeviceType.MuditaPure,
  },
  filesManager: {
    files: [],
  },
}

describe("when `uploadFileRequest` request return Result.success with uploaded files list", () => {
  beforeAll(() => {
    ;(getPathsRequest as jest.Mock).mockResolvedValue(successGetPathResponse)
    ;(uploadFilesRequest as jest.Mock).mockReturnValue(successUploadResponse)
    ;(getFiles as unknown as jest.Mock).mockReturnValue(GET_FILES_MOCK_RESULT)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test("dispatch `setUploadingState` with `State.Loaded` and `getFiles` with provided directory", async () => {
    const mockStore = createMockStore([thunk])(initialStore)

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(uploadFile() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      uploadFile.pending(requestId, ),
      setUploadBlocked(true),
      setUploadingFileCount(2),
      setUploadingState(State.Loading),
      GET_FILES_MOCK_RESULT,
      {
        type: pendingAction("DEVICE_LOAD_STORAGE_INFO"),
        payload: undefined,
      },
      setUploadingState(State.Loaded),
      setUploadBlocked(false),
      uploadFile.fulfilled(undefined, requestId, ),
    ])

    expect(uploadFilesRequest).toHaveBeenLastCalledWith({
      directory: DeviceDirectory.Music,
      filePaths: pathsMock,
    })
  })

  describe("when `uploadFileRequest` request return Result.success with empty files list", () => {
    beforeAll(() => {
      ;(getPathsRequest as jest.Mock).mockResolvedValue(new SuccessResult<string[]>([]))
    })
    afterEach(() => {
      jest.resetAllMocks()
    })

    test("Action is dispatched with empty array as a argument", async () => {
      const mockStore = createMockStore([thunk])(initialStore)

      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(uploadFile() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        uploadFile.pending(requestId),
        setUploadBlocked(true),
        setUploadBlocked(false),
        uploadFile.fulfilled(undefined, requestId, ),
      ])

      expect(uploadFilesRequest).not.toHaveBeenCalled()
    })
  })

  describe("when `uploadFileRequest` request return Result.failed", () => {
    beforeEach(() => {
      ;(getPathsRequest as jest.Mock).mockResolvedValue(successGetPathResponse)
      ;(uploadFilesRequest as jest.Mock).mockReturnValue(failedUploadResponse)
      ;(getFiles as unknown as jest.Mock).mockReturnValue(GET_FILES_MOCK_RESULT)
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test("failed with receive from `uploadFileRequest` error", async () => {
      const mockStore = createMockStore([thunk])(initialStore)

      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        uploadFile() as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        uploadFile.pending(requestId),
        setUploadBlocked(true),
        setUploadingFileCount(2),
        setUploadingState(State.Loading),
        GET_FILES_MOCK_RESULT,

        uploadFile.rejected(testError, requestId, undefined, { ...errorMock }),
      ])

      expect(uploadFilesRequest).toHaveBeenLastCalledWith({
        directory: DeviceDirectory.Music,
        filePaths: pathsMock,
      })
    })
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceEvent, DeviceType } from "Core/device/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { State } from "Core/core/constants"
import { Result, SuccessResult } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { pendingAction } from "Core/__deprecated__/renderer/store/helpers"
import { testError } from "Core/__deprecated__/renderer/store/constants"
import { uploadFilesRequest } from "Core/files-manager/requests"
import { DeviceDirectory } from "Core/files-manager/constants/device-directory.constant"
import { uploadFile } from "Core/files-manager/actions/upload-file.action"
import {
  setUploadBlocked,
  setUploadingFileCount,
  setUploadingState,
} from "Core/files-manager/actions/base.action"
import { getFiles } from "Core/files-manager/actions/get-files.action"
import { getPathsWrapper } from "Core/files-manager/actions/get-paths-wrapper"
import * as loadStorageInfoActionModule from "Core/device/actions/load-storage-info.action"

jest.mock("Core/files-manager/actions/get-paths-wrapper")
jest.mock("Core/files-manager/requests")

const GET_FILES_MOCK_RESULT = {
  type: pendingAction("FILES_MANAGER_GET_FILES"),
  payload: undefined,
}

jest.mock("Core/files-manager/actions/get-files.action")
jest
  .spyOn(loadStorageInfoActionModule, "loadStorageInfoAction")
  .mockImplementation(
    () =>
      ({
        type: pendingAction(DeviceEvent.LoadStorageInfo),
      } as unknown as jest.Mock)
  )

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
    ;(getPathsWrapper as jest.Mock).mockResolvedValue({
      payload: successGetPathResponse,
    })
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
      uploadFile.pending(requestId),
      setUploadBlocked(true),
      setUploadingFileCount(2),
      setUploadingState(State.Loading),
      GET_FILES_MOCK_RESULT,
      {
        type: pendingAction(DeviceEvent.LoadStorageInfo),
      },
      setUploadingState(State.Loaded),
      setUploadBlocked(false),
      uploadFile.fulfilled(undefined, requestId),
    ])

    expect(uploadFilesRequest).toHaveBeenLastCalledWith({
      directory: DeviceDirectory.Music,
      filePaths: pathsMock,
    })
  })

  describe("when `uploadFileRequest` request return Result.success with empty files list", () => {
    beforeAll(() => {
      ;(getPathsWrapper as jest.Mock).mockResolvedValue({
        payload: new SuccessResult<string[]>([]),
      })
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
        uploadFile.fulfilled(undefined, requestId),
      ])

      expect(uploadFilesRequest).not.toHaveBeenCalled()
    })
  })

  describe("when `uploadFileRequest` request return Result.failed", () => {
    beforeEach(() => {
      ;(getPathsWrapper as jest.Mock).mockResolvedValue({
        payload: successGetPathResponse,
      })
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
      } = await mockStore.dispatch(uploadFile() as unknown as AnyAction)

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

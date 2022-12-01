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
import { getPathsRequest } from "App/file-system/requests"
import { uploadFilesRequest } from "App/files-manager/requests"
import { EligibleFormat } from "App/files-manager/constants/eligible-format.constant"
import { DeviceDirectory } from "App/files-manager/constants/device-directory.constant"
import { GetPathsInput } from "App/file-system/dto"
import { uploadFile } from "App/files-manager/actions/upload-file.action"
import {
  setUploadBlocked,
  setUploadingFileLength,
  setUploadingState,
} from "App/files-manager/actions/base.action"

jest.mock("App/file-system/requests")
jest.mock("App/files-manager/requests")

jest.mock("App/files-manager/actions/get-files.action", () => ({
  getFiles: jest.fn().mockReturnValue({
    type: pendingAction("FILES_MANAGER_GET_FILES"),
    payload: undefined,
  }),
}))

jest.mock("App/device/actions/load-storage-info.action", () => ({
  loadStorageInfoAction: jest.fn().mockReturnValue({
    type: pendingAction("DEVICE_LOAD_STORAGE_INFO"),
    payload: undefined,
  }),
}))

const pathsMock = ["/path/file-1.mp3", "/path/file-2.wav"]
const errorMock = new AppError("SOME_ERROR_TYPE", "Luke, I'm your error")
const successGetPathResponse = new SuccessResult<string[]>(pathsMock)
const failedGetPathResponse = Result.failed(errorMock)
const successUploadResponse = new SuccessResult<string[]>(pathsMock)
const failedUploadResponse = Result.failed(errorMock)

const getFilesPathsResponseMock: GetPathsInput = {
  filters: [
    {
      name: "Audio",
      extensions: Object.values(EligibleFormat),
    },
  ],
  properties: ["openFile", "multiSelections"],
}

describe("when `getPathRequest` request return Result.success with files list", () => {
  describe("when `uploadFileRequest` request return Result.success with uploaded files list", () => {
    beforeAll(() => {
      ;(getPathsRequest as jest.Mock).mockResolvedValue(successGetPathResponse)
      ;(uploadFilesRequest as jest.Mock).mockReturnValue(successUploadResponse)
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test("dispatch `setUploadingState` with `State.Loaded` and `getFiles` with provided directory", async () => {
      const mockStore = createMockStore([thunk])({
        device: {
          deviceType: DeviceType.MuditaPure,
        },
      })

      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(uploadFile() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        uploadFile.pending(requestId),
        setUploadBlocked(true),
        setUploadingFileLength(2),
        setUploadingState(State.Loading),
        setUploadBlocked(false),
        {
          type: pendingAction("FILES_MANAGER_GET_FILES"),
          payload: undefined,
        },
        {
          type: pendingAction("DEVICE_LOAD_STORAGE_INFO"),
          payload: undefined,
        },

        setUploadingState(State.Loaded),
        uploadFile.fulfilled(undefined, requestId),
      ])

      expect(getPathsRequest).toHaveBeenLastCalledWith(
        getFilesPathsResponseMock
      )
      expect(uploadFilesRequest).toHaveBeenLastCalledWith({
        directory: DeviceDirectory.Music,
        filePaths: pathsMock,
      })
    })
  })

  describe("when `uploadFileRequest` request return Result.success with empty files list", () => {
    beforeAll(() => {
      ;(getPathsRequest as jest.Mock).mockResolvedValue(Result.success([]))
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test("any action is dispatch", async () => {
      const mockStore = createMockStore([thunk])({
        device: {
          deviceType: DeviceType.MuditaPure,
        },
      })

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

      expect(getPathsRequest).toHaveBeenLastCalledWith(
        getFilesPathsResponseMock
      )
      expect(uploadFilesRequest).not.toHaveBeenCalled()
    })
  })

  describe("when `uploadFileRequest` request return Result.failed", () => {
    beforeAll(() => {
      ;(getPathsRequest as jest.Mock).mockResolvedValue(successGetPathResponse)
      ;(uploadFilesRequest as jest.Mock).mockReturnValue(failedUploadResponse)
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test("failed with receive from `uploadFileRequest` error", async () => {
      const mockStore = createMockStore([thunk])({
        device: {
          deviceType: DeviceType.MuditaPure,
        },
      })

      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(uploadFile() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        uploadFile.pending(requestId),
        setUploadBlocked(true),
        setUploadingFileLength(2),
        setUploadingState(State.Loading),
        setUploadBlocked(false),
        uploadFile.rejected(testError, requestId, undefined, { ...errorMock }),
      ])

      expect(getPathsRequest).toHaveBeenLastCalledWith(
        getFilesPathsResponseMock
      )
      expect(uploadFilesRequest).toHaveBeenLastCalledWith({
        directory: DeviceDirectory.Music,
        filePaths: pathsMock,
      })
    })
  })
})

describe("when `getPathRequest` request return Result.failed", () => {
  beforeAll(() => {
    ;(getPathsRequest as jest.Mock).mockResolvedValue(failedGetPathResponse)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test("failed with receive from `uploadFileRequest` error", async () => {
    const mockStore = createMockStore([thunk])({
      device: {
        deviceType: DeviceType.MuditaPure,
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(uploadFile() as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      uploadFile.pending(requestId),
      setUploadBlocked(true),
      uploadFile.rejected(testError, requestId, undefined, { ...errorMock }),
    ])

    expect(getPathsRequest).toHaveBeenLastCalledWith(getFilesPathsResponseMock)
    expect(uploadFilesRequest).not.toHaveBeenCalled()
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { loadBackupData } from "App/backup/actions/load-backup-data.action"
import getFileData from "Renderer/requests/get-file-data"
import RequestResponse, {
  RequestResponseStatus,
} from "App/main/functions/request-response.interface"
import { FileData } from "App/main/functions/register-get-file-data-listener"
import { BackupEvent } from "App/backup/constants"
import { testError } from "Renderer/store/constants"
import { LoadBackupDataError } from "App/backup/errors"

jest.mock("Renderer/requests/get-file-data")
const successRequestResponse: RequestResponse<FileData[]> = {
  status: RequestResponseStatus.Ok,
  data: [
    {
      filePath: "C:\\backups\\backup-0.text",
      date: new Date(),
    },
  ],
}

const errorRequestResponse: RequestResponse<FileData[]> = {
  status: RequestResponseStatus.Error,
}

beforeEach(() => {
  jest.resetAllMocks()
})

describe("async `loadBackupData` ", () => {
  describe("when pureOsBackupLocation isn't empty and `getFileData` request return success", () => {
    test("fire async `loadBackupData` call `setBackupData` action", async () => {
      ;(getFileData as jest.Mock).mockReturnValue(successRequestResponse)
      const mockStore = createMockStore([thunk])({
        settings: {
          pureOsBackupLocation: "C:\\backups",
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(loadBackupData() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        loadBackupData.pending(requestId),
        {
          type: BackupEvent.SetBackupData,
          payload: successRequestResponse.data,
        },
        loadBackupData.fulfilled(undefined, requestId, undefined),
      ])

      expect(getFileData).toHaveBeenCalled()
    })
  })

  describe("when pureOsBackupLocation is empty", () => {
    test("fire async `loadBackupData` returns `rejected` action", async () => {
      ;(getFileData as jest.Mock).mockReturnValue(successRequestResponse)
      const errorMock = new LoadBackupDataError(
        "Pure OS Backup Desktop Location is undefined"
      )
      const mockStore = createMockStore([thunk])({
        settings: {
          pureOsBackupLocation: "",
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(loadBackupData() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        loadBackupData.pending(requestId),
        loadBackupData.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(getFileData).not.toHaveBeenCalled()
    })
  })

  describe("when `getFileData` request return error", () => {
    test("fire async `loadBackupData` returns `rejected` action", async () => {
      ;(getFileData as jest.Mock).mockReturnValue(errorRequestResponse)
      const errorMock = new LoadBackupDataError(
        "Get Backups Data request failed"
      )
      const mockStore = createMockStore([thunk])({
        settings: {
          pureOsBackupLocation: "C:\\backups",
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(loadBackupData() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        loadBackupData.pending(requestId),
        loadBackupData.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(getFileData).toHaveBeenCalled()
    })
  })
})

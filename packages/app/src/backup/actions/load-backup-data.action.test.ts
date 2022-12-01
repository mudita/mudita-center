/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { Result } from "App/core/builder"
import { loadBackupData } from "App/backup/actions/load-backup-data.action"
import { loadBackupsRequest } from "App/backup/requests/load-backups.request"
import { BackupError, BackupEvent } from "App/backup/constants"
import { Backup } from "App/backup/dto"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { AppError } from "App/core/errors"

jest.mock("App/backup/requests/load-backups.request")

const backup: Backup = {
  filePath: "/usr/files/backup-1",
  date: new Date("2016-08-25T11:00:00.000Z"),
}

beforeEach(() => {
  jest.resetAllMocks()
})

describe("async `loadBackupData` ", () => {
  describe("when osBackupLocation isn't empty and `getFileData` request return success", () => {
    test("fire async `loadBackupData` call `setBackupData` action", async () => {
      ;(loadBackupsRequest as jest.Mock).mockReturnValue(
        Result.success([backup])
      )
      const mockStore = createMockStore([thunk])({
        settings: {
          osBackupLocation: "C:\\backups",
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(loadBackupData() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        loadBackupData.pending(requestId),
        {
          type: BackupEvent.SetBackupData,
          payload: [backup],
        },
        loadBackupData.fulfilled(undefined, requestId, undefined),
      ])

      expect(loadBackupsRequest).toHaveBeenCalledWith("C:\\backups")
    })
  })

  describe("when pureOsBackupLocation is empty", () => {
    test("fire async `loadBackupData` returns `rejected` action", async () => {
      const errorMock = new AppError(
        BackupError.Load,
        "Pure OS Backup Desktop Location is undefined"
      )
      const mockStore = createMockStore([thunk])({
        settings: {
          osBackupLocation: "",
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(loadBackupData() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        loadBackupData.pending(requestId),
        loadBackupData.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(loadBackupsRequest).not.toHaveBeenCalled()
    })
  })

  describe("when `getFileData` request return error", () => {
    test("fire async `loadBackupData` returns `rejected` action", async () => {
      const errorMock = new AppError(
        BackupError.Load,
        "Get Backups Data request failed"
      )

      ;(loadBackupsRequest as jest.Mock).mockReturnValue(
        Result.failed(errorMock)
      )

      const mockStore = createMockStore([thunk])({
        settings: {
          osBackupLocation: "C:\\backups",
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(loadBackupData() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        loadBackupData.pending(requestId),
        loadBackupData.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(loadBackupsRequest).toHaveBeenCalled()
    })
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { startRestoreDevice } from "App/backup/actions/start-restore-device.action"
import { restoreBackupRequest } from "App/backup/requests/restore-backup.request"
import { RestoreBackup } from "App/backup/dto"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { AppError } from "App/core/errors"
import { Result } from "App/core/builder"
import { BackupError } from "App/backup/constants"

jest.mock("App/backup/requests/restore-backup.request")

const dateMock = "2021-08-05T11:50:35.157Z"

const option: RestoreBackup = {
  key: "MySuperSecretKey",
  backup: {
    filePath: "/usr/example/backup",
    date: new Date(dateMock),
  },
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("When backup location path doesn't exists", () => {
  test("rejects with `BackupError.BackupLocationIsUndefined` error", async () => {
    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          backupLocation: undefined,
        },
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      startRestoreDevice(option) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      startRestoreDevice.pending(requestId, option),
      startRestoreDevice.rejected(
        testError,
        requestId,
        option,
        new AppError(
          BackupError.BackupLocationIsUndefined,
          "Pure OS Backup Pure Location is undefined"
        )
      ),
    ])

    expect(restoreBackupRequest).not.toHaveBeenCalled()
  })
})

describe("when `restoreBackupRequest` request returns `Result.success`", () => {
  test("return empty result", async () => {
    ;(restoreBackupRequest as jest.Mock).mockReturnValue(Result.success([]))

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          backupLocation: "C:\\backups",
        },
      },
    })
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      startRestoreDevice(option) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      startRestoreDevice.pending(requestId, option),
      startRestoreDevice.fulfilled(undefined, requestId, option),
    ])

    expect(restoreBackupRequest).toHaveBeenCalledWith({
      token: "MySuperSecretKey",
      filePath: "/usr/example/backup",
      backupLocation: "C:\\backups",
    })
  })
})

describe("when `restoreBackupRequest` request returns `Result.failed`", () => {
  test("fire async `startRestoreDevice` returns `rejected` action", async () => {
    const errorMock = new AppError(
      BackupError.CannotUploadBackupToDevice,
      "Cannot upload backup to device"
    )

    ;(restoreBackupRequest as jest.Mock).mockReturnValue(
      Result.failed(errorMock)
    )

    const mockStore = createMockStore([thunk])({
      device: {
        data: {
          backupLocation: "C:\\backups",
        },
      },
    })
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      startRestoreDevice(option) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      startRestoreDevice.pending(requestId, option),
      startRestoreDevice.rejected(testError, requestId, option, {
        ...errorMock,
      }),
    ])

    expect(restoreBackupRequest).toHaveBeenCalledWith({
      token: "MySuperSecretKey",
      filePath: "/usr/example/backup",
      backupLocation: "C:\\backups",
    })
  })
})

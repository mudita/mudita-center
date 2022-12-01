/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { pendingAction } from "App/__deprecated__/renderer/store/helpers/action.helper"
import { BackupEvent } from "App/backup/constants"
import { startBackupDevice } from "App/backup/actions/start-backup-device.action"
import { createBackupRequest } from "App/backup/requests/create-backup.request"
import { CreateBackup } from "App/backup/dto"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { AppError } from "App/core/errors"
import { Result } from "App/core/builder"
import { BackupError } from "App/backup/constants"

jest.mock("App/backup/requests/create-backup.request")
jest.mock("App/backup/actions/load-backup-data.action", () => ({
  loadBackupData: () => ({
    type: pendingAction(BackupEvent.Load),
    payload: undefined,
  }),
}))

const option: CreateBackup = {
  key: "MySuperSecretKey",
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("When backup location path doesn't exists", () => {
  test("rejects with `BackupError.BackupLocationIsUndefined` error", async () => {
    const mockStore = createMockStore([thunk])({
      settings: {
        osBackupLocation: undefined,
      },
    })

    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      startBackupDevice(option) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      startBackupDevice.pending(requestId, option),
      startBackupDevice.rejected(
        testError,
        requestId,
        option,
        new AppError(
          BackupError.BackupLocationIsUndefined,
          "Pure OS Backup Desktop Location is undefined"
        )
      ),
    ])

    expect(createBackupRequest).not.toHaveBeenCalled()
  })
})

describe("when `createBackupRequest` request returns `Result.success`", () => {
  test("returns backup files list", async () => {
    ;(createBackupRequest as jest.Mock).mockReturnValue(Result.success([]))

    const mockStore = createMockStore([thunk])({
      settings: {
        osBackupLocation: "C:\\backups",
      },
    })
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(
      startBackupDevice(option) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      startBackupDevice.pending(requestId, option),
      {
        type: pendingAction(BackupEvent.Load),
        payload: undefined,
      },
      startBackupDevice.fulfilled(undefined, requestId, option),
    ])

    expect(createBackupRequest).toHaveBeenCalledWith({
      ...option,
      cwd: "C:\\backups",
    })
  })
})

describe("when `createBackupRequest` request returns `Result.failed`", () => {
  test("fire async `startBackupDevice` returns `rejected` action", async () => {
    const errorMock = new AppError(
      BackupError.BackupDownloadFailed,
      "Download backup fails"
    )

    ;(createBackupRequest as jest.Mock).mockReturnValue(
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
    } = await mockStore.dispatch(
      startBackupDevice(option) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      startBackupDevice.pending(requestId, option),
      startBackupDevice.rejected(testError, requestId, option, {
        ...errorMock,
      }),
    ])

    expect(createBackupRequest).toHaveBeenCalledWith({
      ...option,
      cwd: "C:\\backups",
    })
  })
})

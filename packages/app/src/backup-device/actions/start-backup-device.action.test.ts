/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { pendingAction } from "Renderer/store/helpers/action.helper"
import { BackupEvent } from "App/backup/constants"
import {
  startBackupDevice,
  StartBackupOption,
} from "App/backup-device/actions/start-backup-device.action"
import { testError } from "Renderer/store/constants"
import { StartBackupDeviceError } from "App/backup-device/errors"
import { downloadDeviceBackupWithRetries } from "App/backup-device/helpers/download-device-backup-with-retries"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

jest.mock("App/backup-device/helpers/download-device-backup-with-retries")
jest.mock("App/backup/actions/load-backup-data.action", () => ({
  loadBackupData: jest.fn().mockReturnValue({
    type: pendingAction(BackupEvent.Load),
    payload: undefined,
  }),
}))

const successDownloadDeviceBackupResponse: RequestResponse<string[]> = {
  status: RequestResponseStatus.Ok,
  data: [],
}

const option: StartBackupOption = {
  secretKey: "MySuperSecretKey",
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `startBackupDevice` ", () => {
  describe("when each request is success", () => {
    test("fire async `downloadDeviceBackupWithRetries` dispatch `loadBackupData` action", async () => {
      ;(downloadDeviceBackupWithRetries as jest.Mock).mockReturnValue(
        successDownloadDeviceBackupResponse
      )
      const mockStore = createMockStore([thunk])({
        settings: {
          pureOsBackupLocation: "C:\\backups",
        },
      })
      const {
        meta: { requestId },
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

      expect(downloadDeviceBackupWithRetries).toHaveBeenCalled()
    })
  })

  describe("when `startBackupDeviceRequest` return error", () => {
    test("fire async `startBackupDevice` returns `rejected` action", async () => {
      const errorMock = new StartBackupDeviceError("")
      ;(downloadDeviceBackupWithRetries as jest.Mock).mockReturnValue({
        status: RequestResponseStatus.Error,
      })
      const mockStore = createMockStore([thunk])({
        settings: {
          pureOsBackupLocation: "C:\\backups",
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        startBackupDevice(option) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        startBackupDevice.pending(requestId, option),
        startBackupDevice.rejected(testError, requestId, option, errorMock),
      ])

      expect(downloadDeviceBackupWithRetries).toHaveBeenCalled()
    })
  })
})

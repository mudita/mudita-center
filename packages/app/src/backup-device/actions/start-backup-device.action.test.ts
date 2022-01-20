/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { pendingAction } from "Renderer/store/helpers/action.helper"
import { BackupEvent } from "App/backup/constants"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import {
  startBackupDevice,
  StartBackupOption,
} from "App/backup-device/actions/start-backup-device.action"
import { DeviceFile } from "Backend/adapters/device-file-system/device-file-system-adapter.class"
import writeFile from "Renderer/requests/write-file.request"
import encryptFile from "App/file-system/requests/encrypt-file.request"
import { testError } from "Renderer/store/constants"
import { StartBackupDeviceError } from "App/backup-device/errors"
import { downloadDeviceBackupWithRetries } from "App/backup-device/helpers/download-device-backup-with-retries"

jest.mock("App/backup-device/helpers/download-device-backup-with-retries")
jest.mock("Renderer/requests/write-file.request")
jest.mock("App/file-system/requests/encrypt-file.request")
jest.mock("App/backup/actions/load-backup-data.action", () => ({
  loadBackupData: jest.fn().mockReturnValue({
    type: pendingAction(BackupEvent.Load),
    payload: undefined,
  }),
}))

const backupBuffer = Buffer.from("backup data")
const encryptedBuffer = Buffer.from("encrypted backup data")

const successDownloadDeviceBackupResponse: DeviceResponse<DeviceFile> = {
  status: DeviceResponseStatus.Ok,
  data: {
    data: backupBuffer,
    name: `<YYYY-MM-DD>T<HHMMSS>Z`,
  },
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
      ;(encryptFile as jest.Mock).mockReturnValue(encryptedBuffer)
      ;(writeFile as jest.Mock).mockReturnValue(true)
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
      expect(encryptFile).toHaveBeenCalled()
      expect(writeFile).toHaveBeenCalled()
    })
  })

  describe("when `startBackupDeviceRequest` return error", () => {
    test("fire async `startBackupDevice` returns `rejected` action", async () => {
      const errorMock = new StartBackupDeviceError("")
      ;(downloadDeviceBackupWithRetries as jest.Mock).mockReturnValue({
        status: DeviceResponseStatus.Error,
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
      expect(encryptFile).not.toHaveBeenCalled()
      expect(writeFile).not.toHaveBeenCalled()
    })
  })

  describe("when `encryptFile` return error", () => {
    test("fire async `startBackupDevice` returns `rejected` action", async () => {
      const errorMock = new StartBackupDeviceError("Encrypt buffer fails")
      ;(downloadDeviceBackupWithRetries as jest.Mock).mockReturnValue(
        successDownloadDeviceBackupResponse
      )
      ;(encryptFile as jest.Mock).mockReturnValue(undefined)
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
      expect(encryptFile).toHaveBeenCalled()
      expect(writeFile).not.toHaveBeenCalled()
    })
  })

  describe("when `writeFile` return error", () => {
    test("fire async `startBackupDevice` returns `rejected` action", async () => {
      const errorMock = new StartBackupDeviceError(
        "write file request returns error"
      )
      ;(downloadDeviceBackupWithRetries as jest.Mock).mockReturnValue(
        successDownloadDeviceBackupResponse
      )
      ;(encryptFile as jest.Mock).mockReturnValue(encryptedBuffer)
      ;(writeFile as jest.Mock).mockReturnValue(false)
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
      expect(encryptFile).toHaveBeenCalled()
      expect(writeFile).toHaveBeenCalled()
    })
  })
})

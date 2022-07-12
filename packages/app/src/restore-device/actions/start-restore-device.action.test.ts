/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import { BackupDeviceError } from "App/backup-device"
import { Backup } from "App/backup/reducers"
import { AppError } from "App/core/errors"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { DeviceState } from "App/device"
import uploadDeviceFile from "App/device-file-system/requests/upload-device-file.request"
import decryptFile from "App/file-system/requests/decrypt-file.request"
import readFile from "App/file-system/requests/read-file.request"
import {
  startRestoreDevice,
  StartRestoreOption,
} from "App/restore-device/actions/start-restore-device.action"
import { RestoreDeviceError } from "App/restore-device/constants"
import { waitUntilRestoreDeviceFinished } from "App/restore-device/helpers"
import startRestoreDeviceRequest from "App/__deprecated__/renderer/requests/start-restore-device.request"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import { testError } from "App/__deprecated__/renderer/store/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

jest.mock("App/file-system/requests/decrypt-file.request")
jest.mock("App/file-system/requests/read-file.request")
jest.mock("App/device-file-system/requests/upload-device-file.request")
jest.mock("App/__deprecated__/renderer/requests/start-restore-device.request")
jest.mock("App/restore-device/helpers/wait-until-restore-device-finished")

const successDeviceResponse: RequestResponse = {
  status: RequestResponseStatus.Ok,
}

const errorDeviceResponse: RequestResponse = {
  status: RequestResponseStatus.Error,
}

const backup: Backup = {
  filePath: "C:\\backups\\backup-1.text",
  date: new Date(),
}

const option: StartRestoreOption = {
  secretKey: "MySuperSecretKey",
  backup,
}

const encryptedBuffer = Buffer.from("encrypted backup data")
const decryptedBuffer = Buffer.from("decrypted backup data")

const mockStoreState: Partial<RootState & ReduxRootState> = {
  device: {
    data: {
      backupLocation: "path/to/directory",
    },
  } as DeviceState,
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `startRestoreDevice` ", () => {
  describe("when each request is success", () => {
    test("fire async `startRestoreDevice`", async () => {
      ;(readFile as jest.Mock).mockReturnValue(encryptedBuffer)
      ;(decryptFile as jest.Mock).mockReturnValue(decryptedBuffer)
      ;(uploadDeviceFile as jest.Mock).mockReturnValue(successDeviceResponse)
      ;(startRestoreDeviceRequest as jest.Mock).mockReturnValue(
        successDeviceResponse
      )
      ;(waitUntilRestoreDeviceFinished as jest.Mock).mockReturnValue(
        successDeviceResponse
      )
      const mockStore = createMockStore([thunk])(mockStoreState)
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        startRestoreDevice(option) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        startRestoreDevice.pending(requestId, option),
        startRestoreDevice.fulfilled(undefined, requestId, option),
      ])

      expect(decryptFile).toHaveBeenCalled()
      expect(uploadDeviceFile).toHaveBeenCalled()
      expect(startRestoreDeviceRequest).toHaveBeenCalled()
      expect(waitUntilRestoreDeviceFinished).toHaveBeenCalled()
    })
  })

  describe("when `backupLocation` of deviceInfo is empty", () => {
    test("fire async `startRestoreDevice` returns `rejected` action", async () => {
      const errorMock = new AppError(
        BackupDeviceError.StartBackupDevice,
        "Pure OS Backup Pure Location is undefined"
      )

      const mockStore = createMockStore([thunk])({
        device: {
          data: {
            backupLocation: "",
          },
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        startRestoreDevice(option) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        startRestoreDevice.pending(requestId, option),
        startRestoreDevice.rejected(testError, requestId, option, errorMock),
      ])

      expect(readFile).not.toHaveBeenCalled()
      expect(decryptFile).not.toHaveBeenCalled()
      expect(uploadDeviceFile).not.toHaveBeenCalled()
      expect(startRestoreDeviceRequest).not.toHaveBeenCalled()
      expect(waitUntilRestoreDeviceFinished).not.toHaveBeenCalled()
    })
  })

  describe("when `readFile` return error", () => {
    test("fire async `startRestoreDevice` returns `rejected` action", async () => {
      const errorMock = new AppError(
        RestoreDeviceError.StartRestoreDevice,
        "Read File fails"
      )
      ;(readFile as jest.Mock).mockReturnValue(undefined)
      const mockStore = createMockStore([thunk])(mockStoreState)
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        startRestoreDevice(option) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        startRestoreDevice.pending(requestId, option),
        startRestoreDevice.rejected(testError, requestId, option, errorMock),
      ])

      expect(readFile).toHaveBeenCalled()
      expect(decryptFile).not.toHaveBeenCalled()
      expect(uploadDeviceFile).not.toHaveBeenCalled()
      expect(startRestoreDeviceRequest).not.toHaveBeenCalled()
      expect(startRestoreDeviceRequest).not.toHaveBeenCalled()
    })
  })

  describe("when `decryptFile` return error", () => {
    test("fire async `startRestoreDevice` returns `rejected` action", async () => {
      const errorMock = new AppError(
        RestoreDeviceError.StartRestoreDevice,
        "Decrypt buffer fails"
      )
      ;(readFile as jest.Mock).mockReturnValue(encryptedBuffer)
      ;(decryptFile as jest.Mock).mockReturnValue(undefined)
      const mockStore = createMockStore([thunk])(mockStoreState)
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        startRestoreDevice(option) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        startRestoreDevice.pending(requestId, option),
        startRestoreDevice.rejected(testError, requestId, option, errorMock),
      ])

      expect(readFile).toHaveBeenCalled()
      expect(decryptFile).toHaveBeenCalled()
      expect(uploadDeviceFile).not.toHaveBeenCalled()
      expect(startRestoreDeviceRequest).not.toHaveBeenCalled()
      expect(startRestoreDeviceRequest).not.toHaveBeenCalled()
    })
  })

  describe("when `uploadDeviceFile` return error", () => {
    test("fire async `startRestoreDevice` returns `rejected` action", async () => {
      const errorMock = new AppError(
        RestoreDeviceError.StartRestoreDevice,
        "Upload Backup File returns error"
      )
      ;(readFile as jest.Mock).mockReturnValue(encryptedBuffer)
      ;(decryptFile as jest.Mock).mockReturnValue(decryptedBuffer)
      ;(uploadDeviceFile as jest.Mock).mockReturnValue(errorDeviceResponse)
      const mockStore = createMockStore([thunk])(mockStoreState)
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        startRestoreDevice(option) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        startRestoreDevice.pending(requestId, option),
        startRestoreDevice.rejected(testError, requestId, option, errorMock),
      ])

      expect(readFile).toHaveBeenCalled()
      expect(decryptFile).toHaveBeenCalled()
      expect(uploadDeviceFile).toHaveBeenCalled()
      expect(startRestoreDeviceRequest).not.toHaveBeenCalled()
      expect(startRestoreDeviceRequest).not.toHaveBeenCalled()
    })
  })

  describe("when `startRestoreDeviceRequest` return error", () => {
    test("fire async `startRestoreDevice` returns `rejected` action", async () => {
      const errorMock = new AppError(
        RestoreDeviceError.StartRestoreDevice,
        "Start restore Device returns error"
      )
      ;(readFile as jest.Mock).mockReturnValue(encryptedBuffer)
      ;(decryptFile as jest.Mock).mockReturnValue(decryptedBuffer)
      ;(uploadDeviceFile as jest.Mock).mockReturnValue(successDeviceResponse)
      ;(startRestoreDeviceRequest as jest.Mock).mockReturnValue(
        errorDeviceResponse
      )
      const mockStore = createMockStore([thunk])(mockStoreState)
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        startRestoreDevice(option) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        startRestoreDevice.pending(requestId, option),
        startRestoreDevice.rejected(testError, requestId, option, errorMock),
      ])

      expect(readFile).toHaveBeenCalled()
      expect(decryptFile).toHaveBeenCalled()
      expect(uploadDeviceFile).toHaveBeenCalled()
      expect(startRestoreDeviceRequest).toHaveBeenCalled()
      expect(waitUntilRestoreDeviceFinished).not.toHaveBeenCalled()
    })
  })

  describe("when `waitUntilRestoreDeviceFinished` return error", () => {
    test("fire async `startRestoreDevice` returns `rejected` action", async () => {
      const errorMock = new AppError(
        RestoreDeviceError.StartRestoreDevice,
        "One of the getRestoreDeviceStatus requests returns error"
      )
      ;(readFile as jest.Mock).mockReturnValue(encryptedBuffer)
      ;(decryptFile as jest.Mock).mockReturnValue(decryptedBuffer)
      ;(uploadDeviceFile as jest.Mock).mockReturnValue(successDeviceResponse)
      ;(startRestoreDeviceRequest as jest.Mock).mockReturnValue(
        successDeviceResponse
      )
      ;(waitUntilRestoreDeviceFinished as jest.Mock).mockReturnValue(
        errorDeviceResponse
      )
      const mockStore = createMockStore([thunk])(mockStoreState)
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        startRestoreDevice(option) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        startRestoreDevice.pending(requestId, option),
        startRestoreDevice.rejected(testError, requestId, option, errorMock),
      ])

      expect(readFile).toHaveBeenCalled()
      expect(decryptFile).toHaveBeenCalled()
      expect(uploadDeviceFile).toHaveBeenCalled()
      expect(startRestoreDeviceRequest).toHaveBeenCalled()
      expect(waitUntilRestoreDeviceFinished).toHaveBeenCalled()
    })
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import {
  startRestoreDevice,
  StartRestoreOption,
} from "App/restore-device/actions/start-restore-device.action"
import { testError } from "Renderer/store/constants"
import { StartRestoreDeviceError } from "App/restore-device/errors"
import { Backup } from "App/backup/reducers"
import { ReduxRootState, RootState } from "Renderer/store"
import { DeviceState } from "App/device"
import { StartBackupDeviceError } from "App/backup-device/errors"
import uploadDeviceFile from "Renderer/requests/upload-device-file.request"
import startRestoreDeviceRequest from "Renderer/requests/start-restore-device.request"
import readFile from "App/file-system/requests/read-file.request"
import decryptFile from "App/file-system/requests/decrypt-file.request"
import { waitUntilRestoreDeviceFinished } from "App/restore-device/helpers"

jest.mock("App/file-system/requests/decrypt-file.request")
jest.mock("App/file-system/requests/read-file.request")
jest.mock("Renderer/requests/upload-device-file.request")
jest.mock("Renderer/requests/start-restore-device.request")
jest.mock("App/restore-device/helpers/wait-until-restore-device-finished")

const successDeviceResponse: DeviceResponse = {
  status: DeviceResponseStatus.Ok,
}

const errorDeviceResponse: DeviceResponse = {
  status: DeviceResponseStatus.Error,
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
      ;(uploadDeviceFile as jest.Mock).mockReturnValue(
        successDeviceResponse
      )
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
      const errorMock = new StartBackupDeviceError(
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
      const errorMock = new StartRestoreDeviceError("Read File fails")
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
      const errorMock = new StartRestoreDeviceError("Decrypt buffer fails")
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
      const errorMock = new StartRestoreDeviceError(
        "Upload Backup File returns error"
      )
      ;(readFile as jest.Mock).mockReturnValue(encryptedBuffer)
      ;(decryptFile as jest.Mock).mockReturnValue(decryptedBuffer)
      ;(uploadDeviceFile as jest.Mock).mockReturnValue(
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
      expect(startRestoreDeviceRequest).not.toHaveBeenCalled()
      expect(startRestoreDeviceRequest).not.toHaveBeenCalled()
    })
  })

  describe("when `startRestoreDeviceRequest` return error", () => {
    test("fire async `startRestoreDevice` returns `rejected` action", async () => {
      const errorMock = new StartRestoreDeviceError(
        "Start restore Device returns error"
      )
      ;(readFile as jest.Mock).mockReturnValue(encryptedBuffer)
      ;(decryptFile as jest.Mock).mockReturnValue(decryptedBuffer)
      ;(uploadDeviceFile as jest.Mock).mockReturnValue(
        successDeviceResponse
      )
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
      const errorMock = new StartRestoreDeviceError(
        "One of the getRestoreDeviceStatus requests returns error"
      )
      ;(readFile as jest.Mock).mockReturnValue(encryptedBuffer)
      ;(decryptFile as jest.Mock).mockReturnValue(decryptedBuffer)
      ;(uploadDeviceFile as jest.Mock).mockReturnValue(
        successDeviceResponse
      )
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

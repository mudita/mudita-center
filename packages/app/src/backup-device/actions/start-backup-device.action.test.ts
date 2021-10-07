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
import { startBackupDevice } from "App/backup-device/actions/start-backup-device.action"
import { DeviceFile } from "Backend/device-file-system-service/device-file-system-service"
import startBackupDeviceRequest from "Renderer/requests/start-backup-device.request"
import getBackupDeviceStatus from "Renderer/requests/get-backup-device-status.request"
import downloadDeviceFile from "Renderer/requests/download-device-file.request"
import writeFile from "Renderer/requests/write-file.request"
import { testError } from "Renderer/store/constants"
import { StartBackupDeviceError } from "App/backup-device/errors"
import {
  GetBackupDeviceStatusDataState,
  GetBackupDeviceStatusResponseBody,
  StartBackupResponseBody,
} from "@mudita/pure"
jest.mock("Renderer/requests/start-backup-device.request")
jest.mock("Renderer/requests/get-backup-device-status.request")
jest.mock("Renderer/requests/download-device-file.request")
jest.mock("Renderer/requests/write-file.request")
jest.mock("App/backup/actions/load-backup-data.action", () => ({
  loadBackupData: jest.fn().mockReturnValue({
    type: pendingAction(BackupEvent.Load),
    payload: undefined,
  }),
}))

const backupId = `<YYYY-MM-DD>T<HHMMSS>Z`

const successStartBackupDeviceResponse: DeviceResponse<StartBackupResponseBody> =
  {
    status: DeviceResponseStatus.Ok,
    data: {
      id: backupId,
    },
  }

const runningGetBackupDeviceStatusResponse: DeviceResponse<GetBackupDeviceStatusResponseBody> =
  {
    status: DeviceResponseStatus.Ok,
    data: {
      id: backupId,
      state: GetBackupDeviceStatusDataState.Running,
    },
  }

const finishedGetBackupDeviceStatusResponse: DeviceResponse<GetBackupDeviceStatusResponseBody> =
  {
    status: DeviceResponseStatus.Ok,
    data: {
      id: backupId,
      state: GetBackupDeviceStatusDataState.Finished,
    },
  }

const errorGetBackupDeviceStatusResponse: DeviceResponse<GetBackupDeviceStatusResponseBody> =
  {
    status: DeviceResponseStatus.Ok,
    data: {
      id: backupId,
      state: GetBackupDeviceStatusDataState.Error,
    },
  }

const successDownloadDeviceFileResponse: DeviceResponse<DeviceFile> = {
  status: DeviceResponseStatus.Ok,
  data: {
    data: Buffer.from("backup data"),
    name: backupId,
  },
}

afterEach(() => {
  jest.resetAllMocks()
})

const getBackupDeviceStatusMock: (
  error?: boolean
) => () => DeviceResponse<GetBackupDeviceStatusResponseBody> = (
  error = false
) => {
  let index = 0
  return () => {
    if (error) {
      return errorGetBackupDeviceStatusResponse
    } else if (index === 0) {
      return finishedGetBackupDeviceStatusResponse
    } else {
      index++
      return runningGetBackupDeviceStatusResponse
    }
  }
}

describe("async `startBackupDevice` ", () => {
  describe("when each request is success", () => {
    test("fire async `startBackupDevice` dispatch `loadBackupData` action", async () => {
      ;(startBackupDeviceRequest as jest.Mock).mockReturnValue(
        successStartBackupDeviceResponse
      )
      ;(getBackupDeviceStatus as jest.Mock).mockImplementation(
        getBackupDeviceStatusMock()
      )
      ;(downloadDeviceFile as jest.Mock).mockReturnValue(
        successDownloadDeviceFileResponse
      )
      ;(writeFile as jest.Mock).mockReturnValue(true)
      const mockStore = createMockStore([thunk])({
        settings: {
          pureOsBackupLocation: "C:\\backups",
        },
        device: {
          data: {
            backupLocation: "path/to/directory",
          },
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(startBackupDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        startBackupDevice.pending(requestId),
        {
          type: pendingAction(BackupEvent.Load),
          payload: undefined,
        },
        startBackupDevice.fulfilled(undefined, requestId, undefined),
      ])

      expect(startBackupDeviceRequest).toHaveBeenCalled()
      expect(getBackupDeviceStatus).toHaveBeenCalled()
      expect(downloadDeviceFile).toHaveBeenCalled()
      expect(writeFile).toHaveBeenCalled()
    })
  })

  describe("when `backupLocation` of deviceInfo is empty", () => {
    test("fire async `startBackupDevice` returns `rejected` action", async () => {
      const errorMock = new StartBackupDeviceError(
        "Pure OS Backup Pure Location is undefined"
      )
      const mockStore = createMockStore([thunk])({
        settings: {
          pureOsBackupLocation: "C:\\backups",
        },
        device: {
          data: {
            backupLocation: "",
          },
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(startBackupDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        startBackupDevice.pending(requestId),
        startBackupDevice.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(startBackupDeviceRequest).not.toHaveBeenCalled()
      expect(getBackupDeviceStatus).not.toHaveBeenCalled()
      expect(downloadDeviceFile).not.toHaveBeenCalled()
      expect(writeFile).not.toHaveBeenCalled()
    })
  })

  describe("when `pureOsBackupLocation` is empty", () => {
    test("fire async `startBackupDevice` returns `rejected` action", async () => {
      const errorMock = new StartBackupDeviceError(
        "Pure OS Backup Desktop Location is undefined"
      )
      const mockStore = createMockStore([thunk])({
        settings: {
          pureOsBackupLocation: "",
        },
        device: {
          data: {
            backupLocation: "path/to/directory",
          },
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(startBackupDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        startBackupDevice.pending(requestId),
        startBackupDevice.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(startBackupDeviceRequest).not.toHaveBeenCalled()
      expect(getBackupDeviceStatus).not.toHaveBeenCalled()
      expect(downloadDeviceFile).not.toHaveBeenCalled()
      expect(writeFile).not.toHaveBeenCalled()
    })
  })

  describe("when `startBackupDeviceRequest` return error", () => {
    test("fire async `startBackupDevice` returns `rejected` action", async () => {
      const errorMock = new StartBackupDeviceError(
        "Start backup Device returns error"
      )
      ;(startBackupDeviceRequest as jest.Mock).mockReturnValue({
        status: DeviceResponseStatus.Error,
      })
      const mockStore = createMockStore([thunk])({
        settings: {
          pureOsBackupLocation: "C:\\backups",
        },
        device: {
          data: {
            backupLocation: "path/to/directory",
          },
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(startBackupDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        startBackupDevice.pending(requestId),
        startBackupDevice.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(startBackupDeviceRequest).toHaveBeenCalled()
      expect(getBackupDeviceStatus).not.toHaveBeenCalled()
      expect(downloadDeviceFile).not.toHaveBeenCalled()
      expect(writeFile).not.toHaveBeenCalled()
    })
  })

  describe("when `getBackupDeviceStatus` return error", () => {
    test("fire async `startBackupDevice` returns `rejected` action", async () => {
      const errorMock = new StartBackupDeviceError(
        "One of the getBackupDeviceStatus requests returns error"
      )
      ;(startBackupDeviceRequest as jest.Mock).mockReturnValue(
        successStartBackupDeviceResponse
      )
      ;(getBackupDeviceStatus as jest.Mock).mockImplementation(
        getBackupDeviceStatusMock(true)
      )
      const mockStore = createMockStore([thunk])({
        settings: {
          pureOsBackupLocation: "C:\\backups",
        },
        device: {
          data: {
            backupLocation: "path/to/directory",
          },
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(startBackupDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        startBackupDevice.pending(requestId),
        startBackupDevice.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(startBackupDeviceRequest).toHaveBeenCalled()
      expect(getBackupDeviceStatus).toHaveBeenCalled()
      expect(downloadDeviceFile).not.toHaveBeenCalled()
      expect(writeFile).not.toHaveBeenCalled()
    })
  })

  describe("when `downloadDeviceFile` return error", () => {
    test("fire async `startBackupDevice` returns `rejected` action", async () => {
      const errorMock = new StartBackupDeviceError(
        "Download device file request returns error"
      )
      ;(startBackupDeviceRequest as jest.Mock).mockReturnValue(
        successStartBackupDeviceResponse
      )
      ;(getBackupDeviceStatus as jest.Mock).mockImplementation(
        getBackupDeviceStatusMock()
      )
      ;(downloadDeviceFile as jest.Mock).mockReturnValue({
        status: DeviceResponseStatus.Error,
      })
      const mockStore = createMockStore([thunk])({
        settings: {
          pureOsBackupLocation: "C:\\backups",
        },
        device: {
          data: {
            backupLocation: "path/to/directory",
          },
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(startBackupDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        startBackupDevice.pending(requestId),
        startBackupDevice.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(startBackupDeviceRequest).toHaveBeenCalled()
      expect(getBackupDeviceStatus).toHaveBeenCalled()
      expect(downloadDeviceFile).toHaveBeenCalled()
      expect(writeFile).not.toHaveBeenCalled()
    })
  })

  describe("when `writeFile` return error", () => {
    test("fire async `startBackupDevice` returns `rejected` action", async () => {
      const errorMock = new StartBackupDeviceError(
        "write file request returns error"
      )
      ;(startBackupDeviceRequest as jest.Mock).mockReturnValue(
        successStartBackupDeviceResponse
      )
      ;(getBackupDeviceStatus as jest.Mock).mockImplementation(
        getBackupDeviceStatusMock()
      )
      ;(downloadDeviceFile as jest.Mock).mockReturnValue(
        successDownloadDeviceFileResponse
      )
      ;(writeFile as jest.Mock).mockReturnValue(false)
      const mockStore = createMockStore([thunk])({
        settings: {
          pureOsBackupLocation: "C:\\backups",
        },
        device: {
          data: {
            backupLocation: "path/to/directory",
          },
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(startBackupDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        startBackupDevice.pending(requestId),
        startBackupDevice.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(startBackupDeviceRequest).toHaveBeenCalled()
      expect(getBackupDeviceStatus).toHaveBeenCalled()
      expect(downloadDeviceFile).toHaveBeenCalled()
      expect(writeFile).toHaveBeenCalled()
    })
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { AnyAction } from "@reduxjs/toolkit"
import { BackupEvent } from "App/backup/constants"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { startBackupDevice } from "App/backup-device/actions/start-backup-device.action"
import { DeviceFile } from "Backend/device-file-system-service/device-file-system-service"
import getBackupDeviceStatus, {
  GetBackupDeviceStatusData,
  GetBackupDeviceStatusDataState,
} from "Renderer/requests/get-backup-device-status.request"
import startBackupDeviceRequest, {
  StartBackupDeviceData,
} from "Renderer/requests/start-backup-device.request"
import downloadDeviceFile from "Renderer/requests/download-device-file.request"
import writeFile from "Renderer/requests/write-file.request"
import { loadBackupData } from "App/backup/actions"
import { testError } from "Renderer/store/constants"
import { StartBackupDeviceError } from "App/backup-device/errors"

jest.mock("Renderer/requests/start-backup-device.request")
jest.mock("Renderer/requests/get-backup-device-status.request")
jest.mock("Renderer/requests/download-device-file.request")
jest.mock("Renderer/requests/write-file.request")

const backupId = `<YYYY-MM-DD>T<HHMMSS>Z`

const successStartBackupDeviceResponse: DeviceResponse<StartBackupDeviceData> =
  {
    status: DeviceResponseStatus.Ok,
    data: {
      id: backupId,
    },
  }

const runningGetBackupDeviceStatusResponse: DeviceResponse<GetBackupDeviceStatusData> =
  {
    status: DeviceResponseStatus.Ok,
    data: {
      state: GetBackupDeviceStatusDataState.running,
    },
  }
const finishedGetBackupDeviceStatusResponse: DeviceResponse<GetBackupDeviceStatusData> =
  {
    status: DeviceResponseStatus.Ok,
    data: {
      state: GetBackupDeviceStatusDataState.finished,
    },
  }

const errorGetBackupDeviceStatusResponse: DeviceResponse<GetBackupDeviceStatusData> =
  {
    status: DeviceResponseStatus.Ok,
    data: {
      state: GetBackupDeviceStatusDataState.error,
    },
  }

const successDownloadDeviceFileResponse: DeviceResponse<DeviceFile> = {
  status: DeviceResponseStatus.Ok,
  data: {
    data: "backup data",
    name: backupId,
  },
}

beforeEach(() => {
  jest.resetAllMocks()
})

const getBackupDeviceStatusMock: (
  error?: boolean
) => () => DeviceResponse<GetBackupDeviceStatusData> = (error = false) => {
  let index = 0
  return () => {
    if (error) {
      return errorGetBackupDeviceStatusResponse
    } else if (index === 0) {
      return runningGetBackupDeviceStatusResponse
    } else {
      index++
      return finishedGetBackupDeviceStatusResponse
    }
  }
}

describe("async `startBackupDevice` ", () => {
  describe("when each request is success", () => {
    test("fire async `startBackupDevice` trigger `load-backup-data` action", async () => {
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
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(startBackupDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        startBackupDevice.pending(requestId),
        {
          type: BackupEvent.Load,
        },
        startBackupDevice.fulfilled(undefined, requestId, undefined),
      ])

      expect(startBackupDeviceRequest).toHaveBeenCalled()
      expect(getBackupDeviceStatus).toHaveBeenCalled()
      expect(downloadDeviceFile).toHaveBeenCalled()
      expect(writeFile).toHaveBeenCalled()
    })
  })

  describe("when `pureOsBackupLocation` is empty", () => {
    test("fire async `startBackupDevice` returns `rejected` action", async () => {
      const errorMock = new StartBackupDeviceError(
        "Pure OS Backup Location is undefined"
      )
      const mockStore = createMockStore([thunk])({
        settings: {
          pureOsBackupLocation: "",
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(startBackupDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        startBackupDevice.pending(requestId),
        loadBackupData.rejected(testError, requestId, undefined, errorMock),
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
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(startBackupDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        startBackupDevice.pending(requestId),
        loadBackupData.rejected(testError, requestId, undefined, errorMock),
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
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(startBackupDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        startBackupDevice.pending(requestId),
        loadBackupData.rejected(testError, requestId, undefined, errorMock),
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
        "Download device file request returns error "
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
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(startBackupDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        startBackupDevice.pending(requestId),
        loadBackupData.rejected(testError, requestId, undefined, errorMock),
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
        "Download device file request returns error "
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
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(startBackupDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        startBackupDevice.pending(requestId),
        loadBackupData.rejected(testError, requestId, undefined, errorMock),
      ])

      expect(startBackupDeviceRequest).toHaveBeenCalled()
      expect(getBackupDeviceStatus).toHaveBeenCalled()
      expect(downloadDeviceFile).toHaveBeenCalled()
      expect(writeFile).toHaveBeenCalled()
    })
  })
})

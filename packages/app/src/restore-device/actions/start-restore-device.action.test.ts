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
import { startRestoreDevice } from "App/restore-device/actions/start-restore-device.action"
import startRestoreDeviceRequest from "Renderer/requests/start-restore-device.request"
import getRestoreDeviceStatus from "Renderer/requests/get-restore-device-status.request"
import { testError } from "Renderer/store/constants"
import { StartRestoreDeviceError } from "App/restore-device/errors"
import {
  GetRestoreDeviceStatusDataState,
  GetRestoreDeviceStatusResponseBody,
} from "@mudita/pure"
import { Backup } from "App/backup/reducers"
import uploadDeviceFile from "Renderer/requests/upload-device-file.request"
import { ReduxRootState, RootState } from "Renderer/store"
import { DeviceState } from "App/device"
import { StartBackupDeviceError } from "App/backup-device/errors"
;``
jest.mock("Renderer/requests/start-restore-device.request")
jest.mock("Renderer/requests/get-restore-device-status.request")
jest.mock("Renderer/requests/upload-device-file.request")

const backupId = `<YYYY-MM-DD>T<HHMMSS>Z`

const successDeviceResponse: DeviceResponse = {
  status: DeviceResponseStatus.Ok,
}

const errorDeviceResponse: DeviceResponse = {
  status: DeviceResponseStatus.Error,
}

const runningGetRestoreDeviceStatusResponse: DeviceResponse<GetRestoreDeviceStatusResponseBody> =
  {
    status: DeviceResponseStatus.Ok,
    data: {
      id: backupId,
      state: GetRestoreDeviceStatusDataState.Running,
    },
  }

const finishedGetRestoreDeviceStatusResponse: DeviceResponse<GetRestoreDeviceStatusResponseBody> =
  {
    status: DeviceResponseStatus.Ok,
    data: {
      id: backupId,
      state: GetRestoreDeviceStatusDataState.Finished,
    },
  }

const errorGetRestoreDeviceStatusResponse: DeviceResponse<GetRestoreDeviceStatusResponseBody> =
  {
    status: DeviceResponseStatus.Ok,
    data: {
      id: backupId,
      state: GetRestoreDeviceStatusDataState.Error,
    },
  }

const backup: Backup = {
  filePath: "C:\\backups\\backup-1.text",
  date: new Date(),
}

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

const getRestoreDeviceStatusMock: (
  error?: boolean
) => () => DeviceResponse<GetRestoreDeviceStatusResponseBody> = (
  error = false
) => {
  let index = 0
  return () => {
    if (error) {
      return errorGetRestoreDeviceStatusResponse
    } else if (index === 0) {
      return finishedGetRestoreDeviceStatusResponse
    } else {
      index++
      return runningGetRestoreDeviceStatusResponse
    }
  }
}

describe("async `startRestoreDevice` ", () => {
  describe("when each request is success", () => {
    test("fire async `startRestoreDevice`", async () => {
      ;(uploadDeviceFile as jest.Mock).mockReturnValue(successDeviceResponse)
      ;(startRestoreDeviceRequest as jest.Mock).mockReturnValue(
        successDeviceResponse
      )
      ;(getRestoreDeviceStatus as jest.Mock).mockImplementation(
        getRestoreDeviceStatusMock()
      )
      const mockStore = createMockStore([thunk])(mockStoreState)
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        startRestoreDevice(backup) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        startRestoreDevice.pending(requestId, backup),
        startRestoreDevice.fulfilled(undefined, requestId, backup),
      ])

      expect(uploadDeviceFile).toHaveBeenCalled()
      expect(startRestoreDeviceRequest).toHaveBeenCalled()
      expect(getRestoreDeviceStatus).toHaveBeenCalled()
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
        startRestoreDevice(backup) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        startRestoreDevice.pending(requestId, backup),
        startRestoreDevice.rejected(testError, requestId, backup, errorMock),
      ])

      expect(uploadDeviceFile).not.toHaveBeenCalled()
      expect(startRestoreDeviceRequest).not.toHaveBeenCalled()
      expect(getRestoreDeviceStatus).not.toHaveBeenCalled()
    })
  })

  describe("when `uploadDeviceFile` return error", () => {
    test("fire async `startRestoreDevice` returns `rejected` action", async () => {
      const errorMock = new StartRestoreDeviceError(
        "Upload Backup File returns error"
      )
      ;(uploadDeviceFile as jest.Mock).mockReturnValue(errorDeviceResponse)
      const mockStore = createMockStore([thunk])(mockStoreState)
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        startRestoreDevice(backup) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        startRestoreDevice.pending(requestId, backup),
        startRestoreDevice.rejected(testError, requestId, backup, errorMock),
      ])

      expect(uploadDeviceFile).toHaveBeenCalled()
      expect(startRestoreDeviceRequest).not.toHaveBeenCalled()
      expect(getRestoreDeviceStatus).not.toHaveBeenCalled()
    })
  })

  describe("when `startRestoreDeviceRequest` return error", () => {
    test("fire async `startRestoreDevice` returns `rejected` action", async () => {
      const errorMock = new StartRestoreDeviceError(
        "Start restore Device returns error"
      )
      ;(uploadDeviceFile as jest.Mock).mockReturnValue(successDeviceResponse)
      ;(startRestoreDeviceRequest as jest.Mock).mockReturnValue(
        errorDeviceResponse
      )
      const mockStore = createMockStore([thunk])(mockStoreState)
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        startRestoreDevice(backup) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        startRestoreDevice.pending(requestId, backup),
        startRestoreDevice.rejected(testError, requestId, backup, errorMock),
      ])

      expect(uploadDeviceFile).toHaveBeenCalled()
      expect(startRestoreDeviceRequest).toHaveBeenCalled()
      expect(getRestoreDeviceStatus).not.toHaveBeenCalled()
    })
  })

  describe("when `getRestoreDeviceStatus` return error", () => {
    test("fire async `startRestoreDevice` returns `rejected` action", async () => {
      const errorMock = new StartRestoreDeviceError(
        "One of the getRestoreDeviceStatus requests returns error"
      )
      ;(uploadDeviceFile as jest.Mock).mockReturnValue(successDeviceResponse)
      ;(startRestoreDeviceRequest as jest.Mock).mockReturnValue(
        successDeviceResponse
      )
      ;(getRestoreDeviceStatus as jest.Mock).mockImplementation(
        getRestoreDeviceStatusMock(true)
      )
      const mockStore = createMockStore([thunk])(mockStoreState)
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        startRestoreDevice(backup) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        startRestoreDevice.pending(requestId, backup),
        startRestoreDevice.rejected(testError, requestId, backup, errorMock),
      ])

      expect(uploadDeviceFile).toHaveBeenCalled()
      expect(startRestoreDeviceRequest).toHaveBeenCalled()
      expect(getRestoreDeviceStatus).toHaveBeenCalled()
    })
  })
})

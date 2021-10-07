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
``
jest.mock("Renderer/requests/start-restore-device.request")
jest.mock("Renderer/requests/get-restore-device-status.request")

const backupId = `<YYYY-MM-DD>T<HHMMSS>Z`

const successStartRestoreDeviceResponse: DeviceResponse = {
  status: DeviceResponseStatus.Ok,
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
      ;(startRestoreDeviceRequest as jest.Mock).mockReturnValue(
        successStartRestoreDeviceResponse
      )
      ;(getRestoreDeviceStatus as jest.Mock).mockImplementation(
        getRestoreDeviceStatusMock()
      )
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        startRestoreDevice(backup) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        startRestoreDevice.pending(requestId, backup),
        startRestoreDevice.fulfilled(undefined, requestId, backup),
      ])

      expect(startRestoreDeviceRequest).toHaveBeenCalled()
      expect(getRestoreDeviceStatus).toHaveBeenCalled()
    })
  })

  describe("when `startRestoreDeviceRequest` return error", () => {
    test("fire async `startRestoreDevice` returns `rejected` action", async () => {
      const errorMock = new StartRestoreDeviceError(
        "Start restore Device returns error"
      )
      ;(startRestoreDeviceRequest as jest.Mock).mockReturnValue({
        status: DeviceResponseStatus.Error,
      })
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        startRestoreDevice(backup) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        startRestoreDevice.pending(requestId, backup),
        startRestoreDevice.rejected(testError, requestId, backup, errorMock),
      ])

      expect(startRestoreDeviceRequest).toHaveBeenCalled()
      expect(getRestoreDeviceStatus).not.toHaveBeenCalled()
    })
  })

  describe("when `getRestoreDeviceStatus` return error", () => {
    test("fire async `startRestoreDevice` returns `rejected` action", async () => {
      const errorMock = new StartRestoreDeviceError(
        "One of the getRestoreDeviceStatus requests returns error"
      )
      ;(startRestoreDeviceRequest as jest.Mock).mockReturnValue(
        successStartRestoreDeviceResponse
      )
      ;(getRestoreDeviceStatus as jest.Mock).mockImplementation(
        getRestoreDeviceStatusMock(true)
      )
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        startRestoreDevice(backup) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        startRestoreDevice.pending(requestId, backup),
        startRestoreDevice.rejected(testError, requestId, backup, errorMock),
      ])

      expect(startRestoreDeviceRequest).toHaveBeenCalled()
      expect(getRestoreDeviceStatus).toHaveBeenCalled()
    })
  })
})

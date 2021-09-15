/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { DeviceType } from "@mudita/pure"
import { AnyAction } from "@reduxjs/toolkit"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { ConnectionState } from "App/device/constants"
import { loadDeviceData } from "./load-device-data.action"
import { DeviceLoadingError } from "App/device/errors"

import getDeviceInfo from "Renderer/requests/get-device-info.request"
import getNetworkInfo from "Renderer/requests/get-network-info.request"
import getStorageInfo from "Renderer/requests/get-storage-info.request"
import getBatteryInfo from "Renderer/requests/get-battery-info.request"
import getBackupsInfo from "Renderer/requests/get-backups-info.request"

jest.mock("Renderer/requests/get-device-info.request")
jest.mock("Renderer/requests/get-network-info.request")
jest.mock("Renderer/requests/get-storage-info.request")
jest.mock("Renderer/requests/get-battery-info.request")
jest.mock("Renderer/requests/get-backups-info.request")

const dataMock = {
  data: {
    backups: [
      {
        createdAt: "2020-01-14T11:31:08.244Z",
        size: 10,
      },
      {
        createdAt: "2021-01-14T11:31:08.244Z",
        size: 10,
      },
    ],
    simCards: [
      {
        network: "Network",
        networkLevel: 1,
        number: 1,
        slot: 1,
        active: true,
      },
    ],
    osUpdateDate: "2020-01-14T11:31:08.244Z",
    osVersion: "7.7.7",
    level: 50,
    serialNumber: "123",
    capacity: 1024,
    available: 1000,
  },
}

const requestStatusFactory = (
  status: DeviceResponseStatus,
  withData = true
) => {
  ;[
    getDeviceInfo,
    getNetworkInfo,
    getStorageInfo,
    getBatteryInfo,
    getBackupsInfo,
  ].forEach((request) => {
    ;(request as jest.Mock).mockReturnValueOnce({
      status,
      ...(withData && dataMock),
    })
  })
}

afterEach(() => {
  jest.clearAllMocks()
})

test("fire async `loadDeviceData` don't call nothing if `state` is equal to `Loaded`", async () => {
  const mockStore = createMockStore([thunk])({
    device: {
      state: ConnectionState.Loaded,
    },
  })

  const {
    meta: { requestId },
  } = await mockStore.dispatch(
    loadDeviceData(DeviceType.MuditaPure) as unknown as AnyAction
  )

  expect(mockStore.getActions()).toEqual([
    loadDeviceData.pending(requestId, DeviceType.MuditaPure),
    loadDeviceData.fulfilled(undefined, requestId, DeviceType.MuditaPure),
  ])

  expect(getDeviceInfo).not.toHaveBeenCalled()
  expect(getNetworkInfo).not.toHaveBeenCalled()
  expect(getStorageInfo).not.toHaveBeenCalled()
  expect(getBatteryInfo).not.toHaveBeenCalled()
  expect(getBackupsInfo).not.toHaveBeenCalled()
})

describe("Device type: MuditaPure", () => {
  describe("Each requests return `success`", () => {
    test("fire `loadDeviceData` with `deviceType` equal to `MuditaPure` triggers request depended to `MuditaPure` device", async () => {
      requestStatusFactory(DeviceResponseStatus.Ok)

      const mockStore = createMockStore([thunk])({
        device: {
          state: ConnectionState.Empty,
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        loadDeviceData(DeviceType.MuditaPure) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        loadDeviceData.pending(requestId, DeviceType.MuditaPure),
        {
          type: "DEVICE_SET_DATA",
          payload: {
            networkLevel: "1",
            networkName: "Network",
            batteryLevel: 50,
            lastBackup: {
              createdAt: "2021-01-14T11:31:08.244Z",
              size: 10,
            },
            memorySpace: {
              full: 1024,
              free: 1000,
            },
            osUpdateDate: "2020-01-14T11:31:08.244Z",
            osVersion: "7.7.7",
            serialNumber: "123",
            simCards: [
              {
                active: true,
                network: "Network",
                networkLevel: 1,
                number: 1,
                slot: 1,
              },
            ],
          },
        },
        loadDeviceData.fulfilled(undefined, requestId, DeviceType.MuditaPure),
      ])

      expect(getDeviceInfo).toHaveBeenCalled()
      expect(getNetworkInfo).toHaveBeenCalled()
      expect(getStorageInfo).toHaveBeenCalled()
      expect(getBatteryInfo).toHaveBeenCalled()
      expect(getBackupsInfo).toHaveBeenCalled()
    })
  })

  describe("Each requests return `error`", () => {
    test("fire `loadDeviceData` returns `rejected` action", async () => {
      requestStatusFactory(DeviceResponseStatus.Error)

      const errorMock = new DeviceLoadingError("Device data loading error")
      const mockStore = createMockStore([thunk])({
        device: {
          state: ConnectionState.Empty,
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        loadDeviceData(DeviceType.MuditaPure) as unknown as AnyAction
      )
      expect(mockStore.getActions()).toEqual([
        loadDeviceData.pending(requestId, DeviceType.MuditaPure),
        loadDeviceData.rejected(
          "Rejected" as unknown as Error,
          requestId,
          DeviceType.MuditaPure,
          errorMock
        ),
      ])
    })
  })
})

describe("Device type: MuditaHarmony", () => {
  describe("Each requests return `success`", () => {
    test("fire `loadDeviceData` with `deviceType` equal to `MuditaHarmony` triggers request depended to `MuditaHarmony` device", async () => {
      requestStatusFactory(DeviceResponseStatus.Ok)

      const mockStore = createMockStore([thunk])({
        device: {
          state: ConnectionState.Empty,
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        loadDeviceData(DeviceType.MuditaHarmony) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        loadDeviceData.pending(requestId, DeviceType.MuditaHarmony),
        {
          type: "DEVICE_SET_DATA",
          payload: {
            batteryLevel: 50,
            memorySpace: {
              full: 1024,
              free: 1000,
            },
            osUpdateDate: "2020-01-14T11:31:08.244Z",
            osVersion: "7.7.7",
            serialNumber: "123",
          },
        },
        loadDeviceData.fulfilled(
          undefined,
          requestId,
          DeviceType.MuditaHarmony
        ),
      ])

      expect(getDeviceInfo).toHaveBeenCalled()
      expect(getNetworkInfo).not.toHaveBeenCalled()
      expect(getStorageInfo).toHaveBeenCalled()
      expect(getBatteryInfo).toHaveBeenCalled()
      expect(getBackupsInfo).not.toHaveBeenCalled()
    })
  })

  describe("Each requests return `error`", () => {
    test("fire `loadDeviceData` returns `rejected` action", async () => {
      requestStatusFactory(DeviceResponseStatus.Error)

      const errorMock = new DeviceLoadingError("Device data loading error")
      const mockStore = createMockStore([thunk])({
        device: {
          state: ConnectionState.Empty,
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        loadDeviceData(DeviceType.MuditaHarmony) as unknown as AnyAction
      )
      expect(mockStore.getActions()).toEqual([
        loadDeviceData.pending(requestId, DeviceType.MuditaHarmony),
        loadDeviceData.rejected(
          "Rejected" as unknown as Error,
          requestId,
          DeviceType.MuditaHarmony,
          errorMock
        ),
      ])
    })
  })
})

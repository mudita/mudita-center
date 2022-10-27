/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { DeviceType } from "App/device/constants"
import { AnyAction } from "@reduxjs/toolkit"
import { ConnectionState, DeviceError } from "App/device/constants"
import { loadDeviceData } from "App/device/actions"
import { DeviceDataLoader } from "App/device/loaders/device-data.loader"
import { PureDeviceData, HarmonyDeviceData } from "App/device/reducers"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { AppError } from "App/core/errors"

const errorMock = new AppError(DeviceError.Loading, "Device data loading error")

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
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(
    loadDeviceData(DeviceType.MuditaPure) as unknown as AnyAction
  )

  expect(mockStore.getActions()).toEqual([
    loadDeviceData.pending(requestId, DeviceType.MuditaPure),
    loadDeviceData.fulfilled(undefined, requestId, DeviceType.MuditaPure),
  ])
})

describe("Device type: MuditaPure", () => {
  describe("Each requests return `success`", () => {
    test("fire `loadDeviceData` with `deviceType` equal to `MuditaPure` triggers request depended to `MuditaPure` device", async () => {
      jest
        .spyOn(DeviceDataLoader.prototype, "loadDeviceData")
        .mockResolvedValueOnce({
          networkLevel: "1",
          networkName: "Network",
          batteryLevel: 50,
          memorySpace: {
            usedUserSpace: 1024,
            reservedSpace: 1000,
            total: 2024,
          },
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
        } as PureDeviceData)

      const mockStore = createMockStore([thunk])({
        device: {
          state: ConnectionState.Empty,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
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
            memorySpace: {
              usedUserSpace: 1024,
              reservedSpace: 1000,
              total: 2024,
            },
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
    })
  })

  describe("Each requests return `error`", () => {
    beforeAll(() => {
      jest
        .spyOn(DeviceDataLoader.prototype, "loadDeviceData")
        .mockRejectedValueOnce(errorMock)
    })

    test("fire `loadDeviceData` returns `rejected` action", async () => {
      const mockStore = createMockStore([thunk])({
        device: {
          state: ConnectionState.Empty,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        loadDeviceData(DeviceType.MuditaPure) as unknown as AnyAction
      )
      expect(mockStore.getActions()).toEqual([
        loadDeviceData.pending(requestId, DeviceType.MuditaPure),
        loadDeviceData.rejected(
          testError,
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
      jest
        .spyOn(DeviceDataLoader.prototype, "loadDeviceData")
        .mockResolvedValueOnce({
          batteryLevel: 50,
          memorySpace: {
            usedUserSpace: 1024,
            reservedSpace: 1000,
            total: 2024,
          },
          osVersion: "7.7.7",
          serialNumber: "123",
        } as HarmonyDeviceData)

      const mockStore = createMockStore([thunk])({
        device: {
          state: ConnectionState.Empty,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
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
              usedUserSpace: 1024,
              reservedSpace: 1000,
              total: 2024,
            },
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
    })
  })

  describe("Each requests return `error`", () => {
    beforeAll(() => {
      jest
        .spyOn(DeviceDataLoader.prototype, "loadDeviceData")
        .mockRejectedValueOnce(errorMock)
    })

    test("fire `loadDeviceData` returns `rejected` action", async () => {
      const mockStore = createMockStore([thunk])({
        device: {
          state: ConnectionState.Empty,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(
        loadDeviceData(DeviceType.MuditaHarmony) as unknown as AnyAction
      )
      expect(mockStore.getActions()).toEqual([
        loadDeviceData.pending(requestId, DeviceType.MuditaHarmony),
        loadDeviceData.rejected(
          testError,
          requestId,
          DeviceType.MuditaHarmony,
          errorMock
        ),
      ])
    })
  })
})

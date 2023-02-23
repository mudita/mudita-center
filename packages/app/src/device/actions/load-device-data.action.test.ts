/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { Result } from "App/core/builder"
import { AnyAction } from "@reduxjs/toolkit"
import { ConnectionState, DeviceError } from "App/device/constants"
import { loadDeviceData } from "App/device/actions"
import { PureDeviceData, HarmonyDeviceData } from "App/device/reducers"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { AppError } from "App/core/errors"
import { getDeviceInfoRequest } from "App/device-info/requests"

jest.mock("App/device-info/requests")

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
  } = await mockStore.dispatch(loadDeviceData() as unknown as AnyAction)

  expect(mockStore.getActions()).toEqual([
    loadDeviceData.pending(requestId),
    loadDeviceData.fulfilled(undefined, requestId),
  ])
})

describe("Device type: MuditaPure", () => {
  describe("Each requests return `success`", () => {
    test("fire `loadDeviceData` with `deviceType` equal to `MuditaPure` triggers request depended to `MuditaPure` device", async () => {
      ;(getDeviceInfoRequest as jest.Mock).mockResolvedValueOnce(
        Result.success({
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
        }) as unknown as PureDeviceData
      )

      const mockStore = createMockStore([thunk])({
        device: {
          state: ConnectionState.Empty,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(loadDeviceData() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        loadDeviceData.pending(requestId),
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
        loadDeviceData.fulfilled(undefined, requestId),
      ])
    })
  })

  describe("Each requests return `error`", () => {
    beforeAll(() => {
      ;(getDeviceInfoRequest as jest.Mock).mockRejectedValueOnce(
        Result.failed(errorMock)
      )
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
      } = await mockStore.dispatch(loadDeviceData() as unknown as AnyAction)
      expect(mockStore.getActions()).toEqual([
        loadDeviceData.pending(requestId),
        loadDeviceData.rejected(
          testError,
          requestId,
          undefined,
          Result.failed(errorMock)
        ),
      ])
    })
  })
})

describe("Device type: MuditaHarmony", () => {
  describe("Each requests return `success`", () => {
    test("fire `loadDeviceData` with `deviceType` equal to `MuditaHarmony` triggers request depended to `MuditaHarmony` device", async () => {
      ;(getDeviceInfoRequest as jest.Mock).mockResolvedValueOnce(
        Result.success({
          batteryLevel: 50,
          memorySpace: {
            usedUserSpace: 1024,
            reservedSpace: 1000,
            total: 2024,
          },
          osVersion: "7.7.7",
          serialNumber: "123",
        }) as unknown as HarmonyDeviceData
      )

      const mockStore = createMockStore([thunk])({
        device: {
          state: ConnectionState.Empty,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(loadDeviceData() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        loadDeviceData.pending(requestId),
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
        loadDeviceData.fulfilled(undefined, requestId, undefined),
      ])
    })
  })

  describe("Each requests return `error`", () => {
    beforeAll(() => {
      ;(getDeviceInfoRequest as jest.Mock).mockRejectedValueOnce(
        Result.failed(errorMock)
      )
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
      } = await mockStore.dispatch(loadDeviceData() as unknown as AnyAction)
      expect(mockStore.getActions()).toEqual([
        loadDeviceData.pending(requestId),
        loadDeviceData.rejected(
          testError,
          requestId,
          undefined,
          Result.failed(errorMock)
        ),
      ])
    })
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { SynchronizationState } from "App/data-sync/reducers"
import { PureDataLoader } from "App/device/loaders/pure-data.loader"
import getDeviceInfo from "App/__deprecated__/renderer/requests/get-device-info.request"
import getNetworkInfo from "App/__deprecated__/renderer/requests/get-network-info.request"
import getStorageInfo from "App/__deprecated__/renderer/requests/get-storage-info.request"
import getBatteryInfo from "App/__deprecated__/renderer/requests/get-battery-info.request"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { DeviceError } from "App/device/constants"
import { AppError } from "App/core/errors"

jest.mock("App/__deprecated__/renderer/requests/get-device-info.request")
jest.mock("App/__deprecated__/renderer/requests/get-network-info.request")
jest.mock("App/__deprecated__/renderer/requests/get-storage-info.request")
jest.mock("App/__deprecated__/renderer/requests/get-battery-info.request")

jest.mock("App/__deprecated__/renderer/store/index", () =>
  createMockStore([thunk])({
    dataSync: {
      initialized: true,
      state: SynchronizationState.Empty,
    },
  })
)

afterEach(() => {
  jest.clearAllMocks()
})

const errorMock = new AppError(DeviceError.Loading, "Device data loading error")

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
    osVersion: "7.7.7",
    level: 50,
    serialNumber: "123",
    capacity: 1024,
    available: 1000,
    totalSpace: 16000000000,
  },
}

const requestStatusFactory = (
  status: RequestResponseStatus,
  withData = true
) => {
  ;[getDeviceInfo, getNetworkInfo, getStorageInfo, getBatteryInfo].forEach(
    (request) => {
      ;(request as jest.Mock).mockReturnValueOnce({
        status,
        ...(withData && dataMock),
      })
    }
  )
}

const subject = new PureDataLoader()

describe("PureDataLoader", () => {
  test("calls required requests", async () => {
    requestStatusFactory(RequestResponseStatus.Ok)

    const result = await subject.load()

    expect(result).toEqual({
      backupLocation: undefined,
      caseColour: undefined,
      osVersion: "7.7.7",
      batteryLevel: 50,
      serialNumber: "123",
      memorySpace: { full: 1024, free: 1000, total: 16000000000 },
      networkLevel: "1",
      networkName: "Network",
      simCards: [
        {
          active: true,
          network: "Network",
          networkLevel: 1,
          number: 1,
          slot: 1,
        },
      ],
    })

    expect(getDeviceInfo).toHaveBeenCalled()
    expect(getNetworkInfo).toHaveBeenCalled()
    expect(getStorageInfo).toHaveBeenCalled()
    expect(getBatteryInfo).toHaveBeenCalled()
  })

  test("throw error if one of the request returns failed status", () => {
    requestStatusFactory(RequestResponseStatus.Error)

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(async () => await subject.load()).rejects.toThrowError(errorMock)

    expect(getDeviceInfo).toHaveBeenCalled()
    expect(getNetworkInfo).toHaveBeenCalled()
    expect(getStorageInfo).toHaveBeenCalled()
    expect(getBatteryInfo).toHaveBeenCalled()
  })
})

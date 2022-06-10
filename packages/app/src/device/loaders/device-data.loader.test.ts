/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "@mudita/pure"
import { DeviceDataLoader } from "App/device/loaders/device-data.loader"
import getDeviceInfo from "App/__deprecated__/renderer/requests/get-device-info.request"
import getNetworkInfo from "App/__deprecated__/renderer/requests/get-network-info.request"
import getStorageInfo from "App/__deprecated__/renderer/requests/get-storage-info.request"
import getBatteryInfo from "App/__deprecated__/renderer/requests/get-battery-info.request"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

jest.mock("App/__deprecated__/renderer/requests/get-device-info.request")
jest.mock("App/__deprecated__/renderer/requests/get-network-info.request")
jest.mock("App/__deprecated__/renderer/requests/get-storage-info.request")
jest.mock("App/__deprecated__/renderer/requests/get-battery-info.request")

afterEach(() => {
  jest.clearAllMocks()
})

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

const subject = new DeviceDataLoader()

test("DeviceDataLoader calls PureDataLoader if `deviceType` is equal to `MuditaPure`", async () => {
  requestStatusFactory(RequestResponseStatus.Ok)

  await subject.loadDeviceData(DeviceType.MuditaPure)

  expect(getDeviceInfo).toHaveBeenCalled()
  expect(getNetworkInfo).toHaveBeenCalled()
  expect(getStorageInfo).toHaveBeenCalled()
  expect(getBatteryInfo).toHaveBeenCalled()
})

test("DeviceDataLoader calls HarmonyDataLoader if `deviceType` is equal to `MuditaHarmony`", async () => {
  requestStatusFactory(RequestResponseStatus.Ok)

  await subject.loadDeviceData(DeviceType.MuditaHarmony)

  expect(getDeviceInfo).toHaveBeenCalled()
  expect(getNetworkInfo).not.toHaveBeenCalled()
  expect(getStorageInfo).toHaveBeenCalled()
  expect(getBatteryInfo).toHaveBeenCalled()
})

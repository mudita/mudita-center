/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HarmonyDataLoader } from "App/device/loaders/harmony-data.loader"
import getDeviceInfo from "Renderer/requests/get-device-info.request"
import getStorageInfo from "Renderer/requests/get-storage-info.request"
import getBatteryInfo from "Renderer/requests/get-battery-info.request"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { DeviceLoadingError } from "App/device/errors"

jest.mock("Renderer/requests/get-device-info.request")
jest.mock("Renderer/requests/get-storage-info.request")
jest.mock("Renderer/requests/get-battery-info.request")

afterEach(() => {
  jest.clearAllMocks()
})

const errorMock = new DeviceLoadingError("Device data loading error")

const dataMock = {
  data: {
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
  ;[getDeviceInfo, getStorageInfo, getBatteryInfo].forEach((request) => {
    ;(request as jest.Mock).mockReturnValueOnce({
      status,
      ...(withData && dataMock),
    })
  })
}

const subject = new HarmonyDataLoader()

test("HarmonyDataLoader calls required requests", async () => {
  requestStatusFactory(DeviceResponseStatus.Ok)

  const result = await subject.load()

  expect(result).toEqual({
    osVersion: "7.7.7",
    batteryLevel: 50,
    serialNumber: "123",
    memorySpace: { full: 1024, free: 1000 },
  })

  expect(getDeviceInfo).toHaveBeenCalled()
  expect(getStorageInfo).toHaveBeenCalled()
  expect(getBatteryInfo).toHaveBeenCalled()
})

test("HarmonyDataLoader throw error if one of the request returns failed status", () => {
  requestStatusFactory(DeviceResponseStatus.Error)

  expect(async () => await subject.load()).rejects.toThrowError(errorMock)

  expect(getDeviceInfo).toHaveBeenCalled()
  expect(getStorageInfo).toHaveBeenCalled()
  expect(getBatteryInfo).toHaveBeenCalled()
})

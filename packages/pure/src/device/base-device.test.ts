/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import BaseDevice from "./base-device"
import McSerialPortDevice from "../mc-serial-port-device/mc-serial-port-device"
import { McUsbDevice } from "../mc-usb-device/mc-usb-device"
import { Endpoint, Method, RequestConfig } from "../mc-serial-port-device/types"

const mockBaseMcUsbDevice = {
  getFiles: jest.fn().mockReturnValue([]),
} as unknown as McUsbDevice

const mockSerialPortDevice = {
  request: jest.fn(),
} as unknown as McSerialPortDevice

const subject = new BaseDevice(mockSerialPortDevice, mockBaseMcUsbDevice)

describe("BaseDevice", () => {
  test("getFiles method works properly", () => {
    const files = subject.getFiles()
    expect(files).toEqual([])
    expect(mockBaseMcUsbDevice.getFiles).toHaveBeenCalled()
  })

  test("request method works properly", async () => {
    const requestConfig: RequestConfig = {
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    }
    await subject.request(requestConfig)
    expect(mockSerialPortDevice.request).toHaveBeenCalled()
  })
})

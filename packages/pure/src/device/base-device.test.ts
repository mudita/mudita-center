/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import BaseDevice from "./base-device"
import { DeviceType } from "./constants/device-type.enum"
import BaseMcSerialPortDevice from "./mc-serialport-device"
import BaseMcUsbDevice from "./mc-usb-device"
import {
  McUsbFileType,
  RequestConfig,
  ResponseStatus,
  Endpoint,
  Method,
} from "./device.types"

const serialPortDevice = new BaseMcSerialPortDevice(
  "./path",
  DeviceType.MuditaPure
)
const usbDevice = new BaseMcUsbDevice()

const subject = new BaseDevice(serialPortDevice, usbDevice)

describe("BaseDevice", () => {
  test("getFiles method returns McUsbFiles", () => {
    const files = subject.getFiles()
    expect(files).toEqual(
      Promise.resolve([
        {
          id: "1",
          size: 1234,
          name: "example_file_name",
          type: McUsbFileType.mp3,
        },
        {
          id: "2",
          size: 12345,
          name: "second_example_file_name",
          type: McUsbFileType.wav,
        },
      ])
    )
  })

  test("request method returns error", async () => {
    const requestConfig: RequestConfig = {
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    }
    const response = await subject.request(requestConfig)
    expect(response.status).toEqual(ResponseStatus.ConnectionError)
  })
})

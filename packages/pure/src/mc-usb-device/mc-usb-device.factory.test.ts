/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { McUsbDeviceFactory } from "./mc-usb-device.factory"
import { UsbDeviceFactory } from "./usb-device.factory"
import { McUsbDeviceService } from "./mc-usb-device.service"

jest.mock("./usb-device.factory")
jest.mock("./mc-usb-device.service")

describe("`McUsbDeviceFactory`", () => {
  test("create return McUsbDeviceService instance", async () => {
    const filter = {} as USBDeviceFilter
    const service = await McUsbDeviceFactory.create(filter)
    expect(UsbDeviceFactory.create).toHaveBeenCalledWith(filter)
    expect(McUsbDeviceService).toHaveBeenCalledTimes(1)
    expect(service instanceof McUsbDeviceService).toBeTruthy()
  })
})

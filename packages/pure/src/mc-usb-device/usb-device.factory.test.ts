/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UsbDeviceFactory } from "./usb-device.factory"
import { UsbDeviceFacade } from "./usb-device.facade"
import { UsbDeviceMockFacade } from "./usb-device-mock.facade"

jest.mock("./usb-device.facade")
jest.mock("./usb-device-mock.facade")

beforeEach(() => {
  jest.resetAllMocks()
})

describe("`UsbDeviceFactory`", () => {
  test("service dependency is mocked when `getUsbDevice` no returns device", async () => {
    UsbDeviceFacade.getUsbDevice = jest.fn().mockReturnValue(undefined)
    await UsbDeviceFactory.create({} as USBDeviceFilter)
    expect(UsbDeviceMockFacade).toHaveBeenCalledTimes(1)
  })

  test("service is create with properly dependency when `getUsbDevice` returns device", async () => {
    UsbDeviceFacade.getUsbDevice = jest.fn().mockReturnValue({} as USBDevice)
    await UsbDeviceFactory.create({} as USBDeviceFilter)
    expect(UsbDeviceFacade).toHaveBeenCalledTimes(1)
  })
})

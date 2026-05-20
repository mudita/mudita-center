/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execPromise } from "app-utils/main"
import { MacosUSBPortDeviceParser } from "../../../../usb-port-device-parser"
import { MacosUsbPortDeviceBsdNameParserV2 } from "./macos-usb-port-device-bsd-name-parser-v2"
import type { USBPortDevice } from "./macos-usb-port-device-bsd-name-parser.interface"

jest.mock("app-utils/main", () => ({
  execPromise: jest.fn(),
}))

jest.mock("../../../../usb-port-device-parser", () => ({
  MacosUSBPortDeviceParser: {
    listUsbDevices: jest.fn(),
  },
}))

describe("`MacosUsbPortDeviceBsdNameParserV2.getUSBPortDevices`", () => {
  it("should enrich USB devices with BSD names resolved from locationId", async () => {
    const usbDevices: USBPortDevice[] = [
      {
        path: "3310/0103/0123456789ABCDEF",
        locationId: "0x00100000",
        manufacturer: "Mudita",
        name: "Mudita Harmony (MSC mode)",
        productId: "0103",
        vendorId: "3310",
        serialNumber: "0123456789ABCDEF",
        version: "1.01",
      },
    ]

    ;(MacosUSBPortDeviceParser.listUsbDevices as jest.Mock).mockResolvedValue(
      usbDevices
    )
    ;(execPromise as jest.Mock)
      .mockResolvedValueOnce("Mudita Harmony (MSC mode)")
      .mockResolvedValueOnce("disk4")

    const devices = await MacosUsbPortDeviceBsdNameParserV2.getUSBPortDevices()

    expect(
      MacosUSBPortDeviceParser.listUsbDevices as jest.Mock
    ).toHaveBeenCalled()
    expect(execPromise as jest.Mock).toHaveBeenCalled()
    expect(devices).toEqual([
      {
        ...usbDevices[0],
        bsdName: "disk4",
      },
    ])
  })
})

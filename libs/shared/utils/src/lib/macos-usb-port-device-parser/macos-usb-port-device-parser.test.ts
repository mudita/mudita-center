/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execPromise } from "shared/utils"
import { MacosUSBPortDeviceParser } from "./macos-usb-port-device-parser"

jest.mock("shared/utils", () => ({
  execPromise: jest.fn(),
}))

describe("`MacosDeviceFlashParser.getDevices`", () => {
  it("should return the correct device details", async () => {
    const output = `
USB:
    USB 3.1 Bus:
      Host Controller Driver: AppleT8122USBXHCI
    USB 3.1 Bus:
      Host Controller Driver: AppleT8122USBXHCI
    USB 3.1 Bus:
      Host Controller Driver: AppleT8122USBXHCI
        Mudita Harmony (MSC mode):
          Product ID: 0x0103
          Vendor ID: 0x3310
          Version: 1.01
          Serial Number: 0123456789ABCDEF
          Speed: Up to 480 Mb/s
          Manufacturer: Mudita
          Location ID: 0x00100000 / 1
          Current Available (mA): 500
          Current Required (mA): 100
          Extra Operating Current (mA): 0
          Media:
            HARMONY MSC:
              Capacity: 3,91 GB (3 909 091 328 bytes)
              Removable Media: Yes
              BSD Name: disk4
              Logical Unit: 0
              Partition Map Type: MBR (Master Boot Record)
              S.M.A.R.T. status: Verified
              USB Interface: 0
              Volumes:
                disk4s1:
                  Capacity: 268,4 MB (268 435 456 bytes)
                  BSD Name: disk4s1
                  Content: Linux
                disk4s2:
                  Capacity: 268,4 MB (268 435 456 bytes)
                  BSD Name: disk4s2
                  Content: Linux
                disk4s3:
                  Capacity: 3,03 GB (3 028 286 976 bytes)
                  BSD Name: disk4s3
                  Content: Linux
`
    ;(execPromise as jest.Mock).mockResolvedValue(output)

    const devices = await MacosUSBPortDeviceParser.getUSBPortDevices()
    expect(devices.length).not.toBe(0)
    expect(devices).toEqual([
      {
        bsdName: "disk4",
        locationId: "0x00100000",
        manufacturer: "Mudita",
        name: "Mudita Harmony (MSC mode)",
        path: "3310/0103/0123456789ABCDEF",
        productId: "0103",
        serialNumber: "0123456789ABCDEF",
        vendorId: "3310",
        version: "1.01",
      },
    ])
  })

  it("should return undefined if no matching device is found", async () => {
    const output = `
USB:
    USB 2.0 Bus:
      Logitech USB Optical Mouse:
        Product ID: 0xc52f
        Vendor ID: 0x046d (Logitech)
        Speed: Up to 12 Mb/s
        Manufacturer: Logitech
        Current Required (mA): 98
`
    ;(execPromise as jest.Mock).mockResolvedValue(output)
    const devices = await MacosUSBPortDeviceParser.getUSBPortDevices()
    expect(devices.length).toBe(0)
  })
})

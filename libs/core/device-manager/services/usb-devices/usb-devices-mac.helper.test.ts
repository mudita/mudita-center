/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getHarmonyMSCDevice, parseToPortInfo } from "./usb-devices-mac.helper"
import { PortInfo } from "serialport"

describe("getHarmonyMSCDevice", () => {
  it("should return the correct device details", () => {
    const output = `
      Mudita Harmony (MSC mode):
        Product ID: 0x0103
        Vendor ID: 0x3310
        Version: 1.01
        Serial Number: 0123456789ABCDEF
        Speed: Up to 480 Mb/s
        Manufacturer: Mudita
        Location ID: 0x00140000 / 4
        Current Available (mA): 500
        Current Required (mA): 100
        Extra Operating Current (mA): 0
      Mudita Pure:
        Product ID: 0x0102
        Vendor ID: 0x3310
        Version: 1.12
        Serial Number: 25878580214921
        Speed: Up to 480 Mb/s
        Manufacturer: Mudita
        Location ID: 0x00120000 / 5
        Current Available (mA): 500
        Current Required (mA): 500
        Extra Operating Current (mA): 0
    `

    const device = getHarmonyMSCDevice(output)

    expect(device).toEqual({
      name: "Mudita Harmony (MSC mode)",
      VendorID: "0x3310",
      ProductID: "0x0103",
      SerialNumber: "0123456789ABCDEF",
      Manufacturer: "Mudita",
      LocationID: "0x00140000 / 4",
      Version: "1.01",
      Speed: "Up to 480 Mb/s",
      "CurrentAvailable(mA)": "500",
      "CurrentRequired(mA)": "100",
      "ExtraOperatingCurrent(mA)": "0",
    })
  })

  it("should return null if no matching device is found", () => {
    const output = `
      Mudita Pure:
        Product ID: 0x0102
        Vendor ID: 0x3310
        Version: 1.12
        Serial Number: 25878580214921
        Speed: Up to 480 Mb/s
        Manufacturer: Mudita
        Location ID: 0x00120000 / 5
        Current Available (mA): 500
        Current Required (mA): 500
        Extra Operating Current (mA): 0
    `
    const device = getHarmonyMSCDevice(output)
    expect(device).toBeNull()
  })
})

describe("parseToPortInfo", () => {
  it("should parse DeviceDetails to PortInfo correctly", () => {
    const deviceDetails = {
      name: "Mudita Harmony (MSC mode)",
      VendorID: "0x3310",
      ProductID: "0x0103",
      SerialNumber: "0123456789ABCDEF",
      Manufacturer: "Mudita",
      LocationID: "0x00140000 / 3",
    }

    const portInfo: PortInfo = parseToPortInfo(deviceDetails)

    expect(portInfo).toEqual({
      path: "3310/0103/0123456789ABCDEF",
      manufacturer: "Mudita",
      serialNumber: "0123456789ABCDEF",
      productId: "0103",
      vendorId: "3310",
      locationId: "0x00140000",
    })
  })
})

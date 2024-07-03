/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  getHarmonyMSCDevice,
  parseToPortInfo,
} from "./usb-devices-windows.helper"
import { PortInfo } from "serialport"

describe("getHarmonyMSCDevice", () => {
  it("should return the correct device details", () => {
    const output = `
Name         : MUDITA HARMONY MSC USB Device
DeviceID     : USBSTOR\\DISK&VEN_MUDITA&PROD_HARMONY_MSC&REV_0001\\0123456789ABCDEF&0
Manufacturer : (standard disk station)
Description  : Disk station
Service      : disk

Name         : USB mass storage device
DeviceID     : USB\\VID_3310&PID_0103\\0123456789ABCDEF
Manufacturer : Compatible USB storage device
Description  : USB mass storage device
Service      : USBSTOR

Name         : USB composite device
DeviceID     : USB\\VID_046D&PID_085C\\F48B64BF
Manufacturer : (Standard USB host controller)
Description  : USB composite device
Service      : usbccgp
    `
    const device = getHarmonyMSCDevice(output)
    expect(device).toEqual({
      name: "USB mass storage device",
      deviceId: "USB\\VID_3310&PID_0103\\0123456789ABCDEF",
      manufacturer: "Compatible USB storage device",
      description: "USB mass storage device",
      service: "USBSTOR",
    })
  })

  it("should return undefined if no matching device is found", () => {
    const output = `
Name         : Other Device
DeviceID     : USB\\VID_1234&PID_5678\\87654321
Manufacturer : Other Manufacturer
Description  : Other Device Description
Service      : OtherService
    `
    const device = getHarmonyMSCDevice(output)
    expect(device).toBeUndefined()
  })
})

describe("parseToPortInfo", () => {
  it("should parse DeviceInfo to PortInfo correctly", () => {
    const deviceInfo = {
      name: "Mudita Harmony (MSC mode)",
      deviceId: "USB\\VID_3310&PID_0103\\0123456789ABCDEF",
      manufacturer: "Mudita",
      description: "Mudita Harmony (MSC mode)",
      service: "USBSTOR",
    }

    const portInfo: PortInfo = parseToPortInfo(deviceInfo)

    expect(portInfo).toEqual({
      path: "3310/0103/0123456789ABCDEF",
      manufacturer: "MUDITA",
      serialNumber: "0123456789ABCDEF",
      productId: "0103",
      vendorId: "3310",
    })
  })
})

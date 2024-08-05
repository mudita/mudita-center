/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  getHarmonyMSCDevice,
  parseUsbDeviceDetails,
} from "./usb-devices-linux.helper"
import { PortInfo } from "serialport"

describe("getHarmonyMSCDevice", () => {
  it("should return the correct USB device", () => {
    const output = `
Bus 002 Device 008: ID 3310:0102 MUDITA Sp. z o.o. Mudita Pure
Bus 002 Device 007: ID 3310:0103 MUDITA Sp. z o.o. Mudita Harmony (MSC mode)    
    `
    const device = getHarmonyMSCDevice(output)
    expect(device).toEqual({
      bus: "2",
      device: "7",
      id: "3310:0103",
      description: "MUDITA Sp. z o.o. Mudita Harmony (MSC mode)",
    })
  })

  it("should return undefined if no matching device is found", () => {
    const output = `
      Bus 002 Device 008: ID 3310:0102 MUDITA Sp. z o.o. Mudita Pure
    `
    const device = getHarmonyMSCDevice(output)
    expect(device).toBeUndefined()
  })
})

describe("parseUsbDeviceDetails", () => {
  it("should parse USB device details correctly", () => {
    const output = `
Bus 002 Device 007: ID 3310:0103 MUDITA Sp. z o.o. Mudita Harmony (MSC mode)
Couldn't open device, some information will be missing
Device Descriptor:
    iManufacturer       	1 Mudita
    iProduct            	2 Mudita Harmony (MSC mode)
    iSerial             	3 0123456789ABCDEF
    bNumConfigurations  	1
    Interface Descriptor:
      bLength             	9
      bDescriptorType     	4
      bInterfaceNumber    	0
      iInterface          	0
      Endpoint Descriptor:
        bLength             	7
        bmAttributes        	2
          Transfer Type        	Bulk
          Synch Type           	None
          Usage Type           	Data
        wMaxPacketSize 	0x0200  1x 512 bytes
        bInterval           	0
      Endpoint Descriptor:
        bEndpointAddress 	0x02  EP 2 OUT
        bmAttributes        	2
          Transfer Type        	Bulk
          Synch Type           	None
          Usage Type           	Data
        wMaxPacketSize 	0x0200  1x 512 bytes
        bInterval           	0
    `
    const portInfo: PortInfo = parseUsbDeviceDetails(output)
    expect(portInfo).toEqual({
      path: "3310/0103/0123456789ABCDEF",
      manufacturer: "Mudita",
      serialNumber: "0123456789ABCDEF",
      productId: "0103",
      vendorId: "3310",
    })
  })
})

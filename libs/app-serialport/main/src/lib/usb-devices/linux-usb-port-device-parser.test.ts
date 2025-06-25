/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { LinuxUSBPortDeviceParser } from "./linux-usb-port-device-parser"
import { execPromise } from "app-utils/main"

jest.mock("app-utils/main", () => ({
  execPromise: jest.fn(),
}))

describe("LinuxUSBPortDeviceParser", () => {
  it("lists usb devices correctly", async () => {
    ;(execPromise as jest.Mock).mockResolvedValueOnce(
      `Bus 001 Device 017: ID 3310:0103 MUDITA Sp. z o.o. Mudita Harmony (MSC mode)`
    )
    ;(execPromise as jest.Mock).mockResolvedValueOnce(`
Bus 001 Device 017: ID 3310:0103 MUDITA Sp. z o.o. Mudita Harmony (MSC mode)
Couldn't open device, some information will be missing
Device Descriptor:
  bLength                18
  bDescriptorType         1
  bcdUSB               2.00
  bDeviceClass            0 [unknown]
  bDeviceSubClass         0 [unknown]
  bDeviceProtocol         0
  bMaxPacketSize0        64
  idVendor           0x3310 MUDITA Sp. z o.o.
  idProduct          0x0103 Mudita Harmony (MSC mode)
  bcdDevice            1.01
  iManufacturer           1 Mudita
  iProduct                2 Mudita Harmony (MSC mode)
  iSerial                 3 0123456789ABCDEF
  bNumConfigurations      1
  Configuration Descriptor:
    bLength                 9
    bDescriptorType         2
    wTotalLength       0x0020
    bNumInterfaces          1
    bConfigurationValue     1
    iConfiguration          0
    bmAttributes         0xc0
      Self Powered
    MaxPower              100mA
    Interface Descriptor:
      bLength                 9
      bDescriptorType         4
      bInterfaceNumber        0
      bAlternateSetting       0
      bNumEndpoints           2
      bInterfaceClass         8 Mass Storage
      bInterfaceSubClass      6 SCSI
      bInterfaceProtocol     80 Bulk-Only
      iInterface              0
      Endpoint Descriptor:
        bLength                 7
        bDescriptorType         5
        bEndpointAddress     0x81  EP 1 IN
        bmAttributes            2
          Transfer Type            Bulk
          Synch Type               None
          Usage Type               Data
        wMaxPacketSize     0x0200  1x 512 bytes
        bInterval               0
      Endpoint Descriptor:
        bLength                 7
        bDescriptorType         5
        bEndpointAddress     0x02  EP 2 OUT
        bmAttributes            2
          Transfer Type            Bulk
          Synch Type               None
          Usage Type               Data
        wMaxPacketSize     0x0200  1x 512 bytes
        bInterval               0
`)

    const devices = await LinuxUSBPortDeviceParser.listUsbDevices()
    expect(devices).toEqual([
      {
        manufacturer: "Mudita",
        path: "3310/0103/0123456789ABCDEF",
        productId: "0103",
        serialNumber: "0123456789ABCDEF",
        vendorId: "3310",
      },
    ])
  })

  it("should return an empty array if no devices are found", async () => {
    ;(execPromise as jest.Mock).mockResolvedValueOnce("")

    const devices = await LinuxUSBPortDeviceParser.listUsbDevices()
    expect(devices).toEqual([])
  })

  it("should return an empty array if no details are found for a device", async () => {
    ;(execPromise as jest.Mock).mockResolvedValueOnce(
      `Bus 001 Device 017: ID 3310:0103 MUDITA Sp. z o.o. Mudita Harmony (MSC mode)`
    )
    ;(execPromise as jest.Mock).mockResolvedValueOnce("")

    const devices = await LinuxUSBPortDeviceParser.listUsbDevices()
    expect(devices).toEqual([])
  })
})

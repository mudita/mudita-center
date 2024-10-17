/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execPromise } from "../exec-command"
import { MacosUSBPortDeviceParser } from "./macos-usb-port-device-parser"

jest.mock("../exec-command", () => ({
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
  it("should return the correct device details 2", async () => {
    const output = `
USB:
  USB 3.1 Bus:
   Host Controller Driver: AppleT6000USBXHCI
    USB3.2 Hub:
     Product ID: 0x0411
     Vendor ID: 0x0bda (Realtek Semiconductor Corp.)
     Version: 1.11
     Speed: Up to 5 Gb/s
     Manufacturer: Generic
     Location ID: 0x02200000 / 2
     Current Available (mA): 900
     Current Required (mA): 0
     Extra Operating Current (mA): 0
      AX88179A:
       Product ID: 0x1790
       Vendor ID: 0x0b95 (ASIX Electronics Corporation)
       Version: 2.00
       Serial Number: 007F8A99
       Speed: Up to 5 Gb/s
       Manufacturer: ASIX
       Location ID: 0x02240000 / 6
       Current Available (mA): 900
       Current Required (mA): 184
       Extra Operating Current (mA): 0
    USB2.1 Hub:
     Product ID: 0x5411
     Vendor ID: 0x0bda (Realtek Semiconductor Corp.)
     Version: 1.11
     Speed: Up to 480 Mb/s
     Manufacturer: Generic
     Location ID: 0x02100000 / 1
     Current Available (mA): 500
     Current Required (mA): 0
     Extra Operating Current (mA): 0
      Mudita Harmony (MSC mode):
       Product ID: 0x0103
       Vendor ID: 0x3310
       Version: 1.01
       Serial Number: 0123456789ABCDEF
       Speed: Up to 480 Mb/s
       Manufacturer: Mudita
       Location ID: 0x02120000 / 4
       Current Available (mA): 500
       Current Required (mA): 100
       Extra Operating Current (mA): 0
       Media:
        HARMONY MSC:
         Capacity: 3,91 GB (3 909 091 328 bytes)
         Removable Media: Yes
         BSD Name: disk8
         Logical Unit: 0
         Partition Map Type: MBR (Master Boot Record)
         S.M.A.R.T. status: Verified
         USB Interface: 0
         Volumes:
          disk8s1:
           Capacity: 268,4 MB (268 435 456 bytes)
           BSD Name: disk8s1
           Content: Linux
          disk8s2:
           Capacity: 268,4 MB (268 435 456 bytes)
           BSD Name: disk8s2
           Content: Linux
          disk8s3:
           Capacity: 3,03 GB (3 028 286 976 bytes)
           BSD Name: disk8s3
           Content: Linux
      Hub:
       Product ID: 0x8091
       Vendor ID: 0x1a86
       Version: 2.20
       Speed: Up to 480 Mb/s
       Location ID: 0x02140000 / 3
       Current Available (mA): 500
       Current Required (mA): 100
       Extra Operating Current (mA): 0
        USB3.0 Card Reader:
         Product ID: 0x0749
         Vendor ID: 0x05e3 (Genesys Logic, Inc.)
         Version: 15.38
         Serial Number: 000000001538
         Speed: Up to 480 Mb/s
         Manufacturer: Generic
         Location ID: 0x02143000 / 5
         Current Available (mA): 500
         Current Required (mA): 500
         Extra Operating Current (mA): 0
        USB C Video Adaptor   :
         Product ID: 0x9311
         Vendor ID: 0x25a4
         Version: 2.01
         Serial Number: 000000000001
         Speed: Up to 12 Mb/s
         Manufacturer: USB C
         Location ID: 0x02142000 / 7
         Current Available (mA): 500
         Current Required (mA): 0
         Extra Operating Current (mA): 0
  USB 3.1 Bus:
   Host Controller Driver: AppleT6000USBXHCI
  USB 3.1 Bus:
   Host Controller Driver: AppleT6000USBXHCI
`
    ;(execPromise as jest.Mock).mockResolvedValue(output)

    const devices = await MacosUSBPortDeviceParser.getUSBPortDevices()
    expect(devices.length).not.toBe(0)
    expect(devices).toEqual([
      {
        bsdName: "disk8",
        locationId: "0x02120000",
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

  it("should handle multiple devices of the same type", async () => {
    const output = `
USB:
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
          Media:
            HARMONY MSC:
              BSD Name: disk4
      Mudita Harmony (MSC mode):
          Product ID: 0x0104
          Vendor ID: 0x3310
          Version: 1.02
          Serial Number: 9876543210FEDCBA
          Speed: Up to 480 Mb/s
          Manufacturer: Mudita
          Location ID: 0x00200000 / 2
          Media:
            HARMONY MSC:
              BSD Name: disk5
`
    ;(execPromise as jest.Mock).mockResolvedValue(output)

    const devices = await MacosUSBPortDeviceParser.getUSBPortDevices()
    expect(devices.length).toBe(2)
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
      {
        bsdName: "disk5",
        locationId: "0x00200000",
        manufacturer: "Mudita",
        name: "Mudita Harmony (MSC mode)",
        path: "3310/0104/9876543210FEDCBA",
        productId: "0104",
        serialNumber: "9876543210FEDCBA",
        vendorId: "3310",
        version: "1.02",
      },
    ])
  })

  it("should complete device when only BSD Name is available", async () => {
    const output = `
USB:
    USB 3.1 Bus:
      Host Controller Driver: AppleT8122USBXHCI
        Mudita Harmony (MSC mode):
          Media:
            HARMONY MSC:
              BSD Name: disk7
`
    ;(execPromise as jest.Mock).mockResolvedValue(output)

    const devices = await MacosUSBPortDeviceParser.getUSBPortDevices()
    expect(devices.length).toBe(1)
    expect(devices[0]).toEqual({
      bsdName: "disk7",
      name: "Mudita Harmony (MSC mode)",
      path: "unknown",
    })
  })

  it("should handle devices connected through hubs", async () => {
    const output = `
USB:
    USB 3.1 Bus:
      Host Controller Driver: AppleT8122USBXHCI
        USB3.0 Hub:
          Product ID: 0x0411
          Vendor ID: 0x0bda (Realtek Semiconductor Corp.)
          Version: 1.11
          Speed: Up to 5 Gb/s
          Manufacturer: Generic
          Location ID: 0x02200000 / 2
          Mudita Harmony (MSC mode):
            Product ID: 0x0103
            Vendor ID: 0x3310
            Version: 1.01
            Serial Number: 0123456789ABCDEF
            Speed: Up to 480 Mb/s
            Manufacturer: Mudita
            Location ID: 0x02240000 / 6
            Media:
              HARMONY MSC:
                BSD Name: disk6
`
    ;(execPromise as jest.Mock).mockResolvedValue(output)

    const devices = await MacosUSBPortDeviceParser.getUSBPortDevices()
    expect(devices.length).toBe(1)
    expect(devices[0]).toEqual({
      bsdName: "disk6",
      locationId: "0x02240000",
      manufacturer: "Mudita",
      name: "Mudita Harmony (MSC mode)",
      path: "3310/0103/0123456789ABCDEF",
      productId: "0103",
      serialNumber: "0123456789ABCDEF",
      vendorId: "3310",
      version: "1.01",
    })
  })

  it("should handle device without BSD Name", async () => {
    const output = `
USB:
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
`
    ;(execPromise as jest.Mock).mockResolvedValue(output)

    const devices = await MacosUSBPortDeviceParser.getUSBPortDevices()
    expect(devices.length).toBe(1)
    expect(devices[0].bsdName).toBeUndefined()
    expect(devices[0]).toEqual({
      locationId: "0x00100000",
      manufacturer: "Mudita",
      name: "Mudita Harmony (MSC mode)",
      path: "3310/0103/0123456789ABCDEF",
      productId: "0103",
      serialNumber: "0123456789ABCDEF",
      vendorId: "3310",
      version: "1.01",
    })
  })

  it("should handle device without BSD Name followed by another device", async () => {
    const output = `
USB:
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
        Mudita Bell:
          Product ID: 0x0104
          Vendor ID: 0x3311
          Version: 1.02
          Serial Number: ABCDEF1234567890
          Speed: Up to 480 Mb/s
          Manufacturer: Mudita
          Location ID: 0x00200000 / 2
          Media:
            BELL MSC:
              BSD Name: disk5
`
    ;(execPromise as jest.Mock).mockResolvedValue(output)

    const devices = await MacosUSBPortDeviceParser.getUSBPortDevices()

    expect(devices.length).toBe(2)

    expect(devices[0]).toEqual({
      locationId: "0x00100000",
      manufacturer: "Mudita",
      name: "Mudita Harmony (MSC mode)",
      path: "3310/0103/0123456789ABCDEF",
      productId: "0103",
      serialNumber: "0123456789ABCDEF",
      vendorId: "3310",
      version: "1.01",
      bsdName: undefined,
    })

    expect(devices[1]).toEqual({
      bsdName: "disk5",
      locationId: "0x00200000",
      manufacturer: "Mudita",
      name: "Mudita Bell",
      path: "3311/0104/ABCDEF1234567890",
      productId: "0104",
      serialNumber: "ABCDEF1234567890",
      vendorId: "3311",
      version: "1.02",
    })
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

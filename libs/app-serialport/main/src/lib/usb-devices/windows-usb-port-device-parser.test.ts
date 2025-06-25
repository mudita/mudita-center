/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execPromise } from "app-utils/main"
import { WindowsUSBPortDeviceParser } from "./windows-usb-port-device-parser"

jest.mock("app-utils/main", () => ({
  execPromise: jest.fn(),
}))

describe("WindowsUSBPortDeviceParser", () => {
  it("lists usb devices correctly", async () => {
    ;(execPromise as jest.Mock).mockResolvedValueOnce(
      `
Name         : Microsoft Wireless Transceiver for Bluetooth
DeviceID     : USB\\VID_045E&PID_007E\\PW3.0
Manufacturer : MicrosoftHW
Description  : Microsoft Wireless Transceiver for Bluetooth
Service      : BTHUSB

Name         : Kamera HD FaceTime
DeviceID     : USB\\VID_203A&PID_FFF9&MI_00\\6&AABBCCDD&0&0000
Manufacturer : Microsoft
Description  : Urządzenie wideo USB
Service      : usbvideo

Name         : MUDITA HARMONY MSC USB Device
DeviceID     : USBSTOR\\DISK&VEN_MUDITA&PROD_HARMONY_MSC&REV_0001\\0123456789ABCDEF&0
Manufacturer : (Standardowe stacje dysków)
Description  : Stacja dysków
Service      : disk

Name         : Urządzenie pamięci masowej USB
DeviceID     : USB\\VID_3310&PID_0103\\0123456789ABCDEF
Manufacturer : Zgodne urządzenie magazynujące USB
Description  : Urządzenie pamięci masowej USB
Service      : USBSTOR

Name         : Urządzenie wejściowe USB
DeviceID     : USB\\VID_203A&PID_FFFB&MI_01\\6&BBCCDDEE&0&0001
Manufacturer : (Standardowe urządzenia systemowe)
Description  : Urządzenie wejściowe USB
Service      : HidUsb

Name         : Urządzenie wejściowe USB
DeviceID     : USB\\VID_203A&PID_FFFB&MI_00\\6&CCDDEEFF&0&0000
Manufacturer : (Standardowe urządzenia systemowe)
Description  : Urządzenie wejściowe USB
Service      : HidUsb
`
    )

    const devices = await WindowsUSBPortDeviceParser.listUsbDevices()
    expect(devices).toEqual([
      {
        path: "045E/007E/PW3.0",
        productId: "007E",
        serialNumber: "PW3.0",
        vendorId: "045E",
      },
      {
        path: "203A/FFF9/6&AABBCCDD&0&0000",
        productId: "FFF9",
        serialNumber: "6&AABBCCDD&0&0000",
        vendorId: "203A",
      },
      {
        path: "3310/0103/0123456789ABCDEF",
        productId: "0103",
        serialNumber: "0123456789ABCDEF",
        vendorId: "3310",
      },
      {
        path: "203A/FFFB/6&BBCCDDEE&0&0001",
        productId: "FFFB",
        serialNumber: "6&BBCCDDEE&0&0001",
        vendorId: "203A",
      },
      {
        path: "203A/FFFB/6&CCDDEEFF&0&0000",
        productId: "FFFB",
        serialNumber: "6&CCDDEEFF&0&0000",
        vendorId: "203A",
      },
    ])
  })

  it("should return an empty array if no devices are found", async () => {
    ;(execPromise as jest.Mock).mockResolvedValueOnce("")

    const devices = await WindowsUSBPortDeviceParser.listUsbDevices()
    expect(devices).toEqual([])
  })
})

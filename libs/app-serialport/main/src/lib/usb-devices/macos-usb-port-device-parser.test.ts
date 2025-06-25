/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execPromise } from "app-utils/main"
import { MacosUSBPortDeviceParser } from "./macos-usb-port-device-parser"

jest.mock("app-utils/main", () => ({
  execPromise: jest.fn(),
}))

describe("MacosUSBPortDeviceParser", () => {
  it("lists usb devices correctly", async () => {
    ;(execPromise as jest.Mock).mockResolvedValue(`
{
  "SPUSBDataType" : [
    {
      "_name" : "USB31Bus",
      "host_controller" : "AppleT6000USBXHCI"
    },
    {
      "_items" : [
        {
          "_name" : "Mudita Harmony (MSC mode)",
          "bcd_device" : "1.01",
          "bus_power" : "500",
          "bus_power_used" : "100",
          "device_speed" : "high_speed",
          "extra_current_used" : "0",
          "location_id" : "0x02100000 / 1",
          "manufacturer" : "Mudita",
          "Media" : [
            {
              "_name" : "HARMONY MSC",
              "bsd_name" : "disk8",
              "Logical Unit" : 0,
              "partition_map_type" : "master_boot_record_partition_map_type",
              "removable_media" : "yes",
              "size" : "3,91 GB",
              "size_in_bytes" : 3909091328,
              "smart_status" : "Verified",
              "USB Interface" : 0,
              "volumes" : [
                {
                  "_name" : "disk8s1",
                  "bsd_name" : "disk8s1",
                  "iocontent" : "Linux",
                  "size" : "268,4 MB",
                  "size_in_bytes" : 268435456
                },
                {
                  "_name" : "disk8s2",
                  "bsd_name" : "disk8s2",
                  "iocontent" : "Linux",
                  "size" : "268,4 MB",
                  "size_in_bytes" : 268435456
                },
                {
                  "_name" : "disk8s3",
                  "bsd_name" : "disk8s3",
                  "iocontent" : "Linux",
                  "size" : "3,03 GB",
                  "size_in_bytes" : 3028286976
                }
              ]
            }
          ],
          "product_id" : "0x0103",
          "serial_num" : "0123456789ABCDEF",
          "vendor_id" : "0x3310"
        }
      ],
      "_name" : "USB31Bus",
      "host_controller" : "AppleT6000USBXHCI"
    },
    {
      "_items" : [
        {
          "_items" : [
            {
              "_name" : "LG Monitor Controls",
              "bcd_device" : "4.18",
              "bus_power" : "500",
              "bus_power_used" : "0",
              "device_speed" : "full_speed",
              "extra_current_used" : "0",
              "location_id" : "0x00130000 / 2",
              "manufacturer" : "LG Electronics Inc.",
              "product_id" : "0x9a39",
              "serial_num" : "AABBCCDDEEFF",
              "vendor_id" : "0x043e  (LG Electronics USA Inc.)"
            }
          ],
          "_name" : "USB2.1 Hub",
          "bcd_device" : "2.03",
          "bus_power" : "500",
          "bus_power_used" : "0",
          "device_speed" : "high_speed",
          "extra_current_used" : "0",
          "location_id" : "0x00100000 / 1",
          "manufacturer" : "Generic",
          "product_id" : "0x5411",
          "vendor_id" : "0x0bda  (Realtek Semiconductor Corp.)"
        }
      ],
      "_name" : "USB31Bus",
      "host_controller" : "AppleT6000USBXHCI"
    }
  ]
}`)
    const devices = await MacosUSBPortDeviceParser.listUsbDevices()
    expect(devices).toEqual([
      {
        locationId: "02100000 / 1",
        manufacturer: "Mudita",
        path: "3310/0103/0123456789ABCDEF",
        pnpId: undefined,
        productId: "0103",
        serialNumber: "0123456789ABCDEF",
        vendorId: "3310",
      },
      {
        locationId: "00130000 / 2",
        manufacturer: "LG Electronics Inc.",
        path: "043e  (LG Electronics USA Inc.)/9a39/AABBCCDDEEFF",
        pnpId: undefined,
        productId: "9a39",
        serialNumber: "AABBCCDDEEFF",
        vendorId: "043e  (LG Electronics USA Inc.)",
      },
    ])
  })
})

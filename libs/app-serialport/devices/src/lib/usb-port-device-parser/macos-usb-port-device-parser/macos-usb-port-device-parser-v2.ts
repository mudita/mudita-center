/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execPromise } from "app-utils/main"
import { PortInfo } from "@serialport/bindings-interface"
import { flattenNestedItems } from "./macos-usb-port-device-parser.helpers"

interface SPUSBHostItem {
  USBDeviceKeyProductID?: string
  USBDeviceKeyVendorID?: string
  USBDeviceKeySerialNumber?: string
  USBKeyLocationID?: string
  USBDeviceKeyVendorName?: string
  _items?: SPUSBHostItem[]
}

interface SPUSBHostDataType {
  SPUSBHostDataType: {
    _items?: SPUSBHostItem[]
  }[]
}

export class MacosUsbPortDeviceParserV2 {
  static async listUsbDevices(): Promise<PortInfo[]> {
    const output = await execPromise("system_profiler SPUSBHostDataType -json")
    const { SPUSBHostDataType } = JSON.parse(
      output as string
    ) as SPUSBHostDataType

    const devices = flattenNestedItems<SPUSBHostItem>(
      SPUSBHostDataType.flatMap(({ _items }) => _items)
    )

    return MacosUsbPortDeviceParserV2.mapSPUSBHostItemsToPortInfo(devices)
  }

  private static mapSPUSBHostItemsToPortInfo(
    devices: Array<Omit<SPUSBHostItem, "_items">>
  ): PortInfo[] {
    return devices
      .map((device) => {
        const locationId = device.USBKeyLocationID?.replace(/^0x/i, "")
        const productId = device.USBDeviceKeyProductID?.replace(/^0x/i, "")
        const vendorId = device.USBDeviceKeyVendorID?.replace(/^0x/i, "")
        const serialNumber = device.USBDeviceKeySerialNumber

        const path =
          vendorId && productId && serialNumber
            ? `${vendorId}/${productId}/${serialNumber}`
            : "unknown"

        return {
          path,
          manufacturer: device.USBDeviceKeyVendorName,
          serialNumber,
          locationId,
          productId,
          vendorId,
          pnpId: undefined,
        } satisfies PortInfo
      })
      .filter((d) => d.vendorId && d.productId && d.serialNumber)
  }
}

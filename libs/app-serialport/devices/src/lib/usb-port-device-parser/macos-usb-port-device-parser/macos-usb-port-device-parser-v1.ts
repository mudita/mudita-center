/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execPromise } from "app-utils/main"
import { PortInfo } from "@serialport/bindings-interface"
import { flattenNestedItems } from "./macos-usb-port-device-parser.helpers"

interface SPUSBItem {
  product_id?: string
  vendor_id?: string
  serial_num?: string
  location_id?: string
  manufacturer?: string
  _items?: SPUSBItem[]
}

interface SPUSBDataType {
  SPUSBDataType: {
    _items?: SPUSBItem[]
  }[]
}

export class MacosUsbPortDeviceParserV1 {
  static async listUsbDevices(): Promise<PortInfo[]> {
    const output = await execPromise("system_profiler SPUSBDataType -json")
    const { SPUSBDataType } = JSON.parse(output as string) as SPUSBDataType

    const devices = flattenNestedItems<SPUSBItem>(
      SPUSBDataType.flatMap(({ _items }) => _items)
    )

    return MacosUsbPortDeviceParserV1.mapSPUSBItemsToPortInfo(devices)
  }

  private static mapSPUSBItemsToPortInfo(
    devices: Array<Omit<SPUSBItem, "_items">>
  ): PortInfo[] {
    return devices
      .map((device) => {
        const locationId = device.location_id?.replace(/^0x/i, "")
        const productId = device.product_id?.replace(/^0x/i, "")
        const vendorId = device.vendor_id?.replace(/^0x/i, "")
        const serialNumber = device.serial_num

        const path =
          vendorId && productId && serialNumber
            ? `${vendorId}/${productId}/${serialNumber}`
            : "unknown"

        return {
          path,
          manufacturer: device.manufacturer,
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

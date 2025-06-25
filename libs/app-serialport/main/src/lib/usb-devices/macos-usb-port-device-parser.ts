/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execPromise } from "app-utils/main"
import { PortInfo } from "@serialport/bindings-interface"

interface SPUSBItem {
  product_id: string
  vendor_id: string
  serial_num: string
  location_id?: string
  manufacturer?: string
  _items?: SPUSBItem[]
}

interface SPUSBDataType {
  SPUSBDataType: {
    _items?: SPUSBItem[]
  }[]
}

export class MacosUSBPortDeviceParser {
  static async listUsbDevices(): Promise<PortInfo[]> {
    const output = await execPromise("system_profiler SPUSBDataType -json")
    const { SPUSBDataType } = JSON.parse(output as string) as SPUSBDataType

    const devices = this.parseSPUSBItems(
      SPUSBDataType.flatMap(({ _items }) => _items)
    )

    return devices
      .map((device) => {
        const locationId = device.location_id?.replace("0x", "")
        const productId = device.product_id?.replace("0x", "")
        const vendorId = device.vendor_id?.replace("0x", "")

        const path = `${vendorId}/${productId}/${device.serial_num}`
        return {
          path,
          manufacturer: device.manufacturer,
          serialNumber: device.serial_num,
          locationId,
          productId,
          vendorId,
          pnpId: undefined,
        }
      })
      .filter(
        (device) => device.vendorId && device.productId && device.serialNumber
      )
  }

  private static parseSPUSBItems(
    items: (SPUSBItem | undefined)[] = []
  ): Omit<SPUSBItem, "_items">[] {
    const devices: Omit<SPUSBItem, "_items">[] = []

    for (const item of items) {
      if (item?._items) {
        devices.push(...this.parseSPUSBItems(item._items))
      } else if (item) {
        devices.push(item)
      }
    }
    return devices
  }
}

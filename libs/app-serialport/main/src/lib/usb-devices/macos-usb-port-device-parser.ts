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

interface SPUSBHostItem {
  USBDeviceKeyProductID: string
  USBDeviceKeyVendorID: string
  USBDeviceKeySerialNumber: string
  USBKeyLocationID?: string
  USBDeviceKeyVendorName?: string
  _items?: SPUSBHostItem[]
}

interface SPUSBHostDataType {
  SPUSBHostDataType: {
    _items?: SPUSBHostItem[]
  }[]
}

export class MacosUSBPortDeviceParser {
  static async listUsbDevices(): Promise<PortInfo[]> {
    const SPUSBItems = await this.getSPUSBItems()
    const devices = this.parseSPUSBItems(SPUSBItems)

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

  private static async getSPUSBItems(
    commandType: "SPUSBDataType" | "SPUSBHostDataType" = "SPUSBDataType"
  ): Promise<SPUSBItem[]> {
    try {
      if (commandType === "SPUSBDataType") {
        const output = await execPromise("system_profiler SPUSBDataType -json")
        const { SPUSBDataType } = JSON.parse(output as string) as SPUSBDataType
        if (SPUSBDataType.length > 0) {
          return SPUSBDataType.flatMap(({ _items }) => {
            return _items || []
          })
        }
        return this.getSPUSBItems("SPUSBHostDataType")
      }

      if (commandType === "SPUSBHostDataType") {
        const output = await execPromise(
          "system_profiler SPUSBHostDataType -json"
        )
        const { SPUSBHostDataType } = JSON.parse(
          output as string
        ) as SPUSBHostDataType
        return SPUSBHostDataType.flatMap(({ _items }) => {
          return (
            _items?.map((item) => {
              return {
                product_id: item.USBDeviceKeyProductID,
                vendor_id: item.USBDeviceKeyVendorID,
                serial_num: item.USBDeviceKeySerialNumber,
                location_id: item.USBKeyLocationID,
                manufacturer: item.USBDeviceKeyVendorName,
              } as SPUSBItem
            }) || []
          )
        })
      }

      return []
    } catch {
      if (commandType === "SPUSBDataType") {
        return this.getSPUSBItems("SPUSBHostDataType")
      }
      throw new Error(
        "Failed to retrieve USB data after multiple attempts. Please ensure you have the necessary permissions and try again."
      )
    }
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

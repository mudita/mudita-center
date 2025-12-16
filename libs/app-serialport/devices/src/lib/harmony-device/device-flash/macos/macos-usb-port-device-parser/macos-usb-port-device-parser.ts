/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execPromise } from "app-utils/main"
import isMatch from "lodash/isMatch"
import {
  USBDevice,
  USBPortDevice,
  USBPortDeviceFilters,
} from "./macos-usb-port-device-parser.interface"

const fieldPatterns: Partial<Record<keyof USBDevice, RegExp>> = {
  version: /^\s*Version:\s*([\d.]+)$/,
  bsdName: /^\s*BSD Name:\s*(disk[0-9a-zA-Z]+)$/,
  manufacturer: /^\s*Manufacturer:\s*(.*)$/,
  serialNumber: /^\s*Serial Number:\s*(\w+)$/,
  locationId: /^\s*Location ID:\s*(0x[0-9a-fA-F]+ \/ \d+)$/,
  productId: /^\s*Product ID:\s*(0x[0-9a-fA-F]+)$/,
  vendorId: /^\s*Vendor ID:\s*(0x[0-9a-fA-F]+)$/,
}

export class MacosUSBPortDeviceParser {
  static async getUSBPortDevices(
    filters?: USBPortDeviceFilters
  ): Promise<USBPortDevice[]> {
    const usbDevices = await MacosUSBPortDeviceParser.getUSBDevice()
    return usbDevices.reduce<USBPortDevice[]>((filteredDevices, usbDevice) => {
      const vendorId = usbDevice.vendorId?.replace("0x", "")
      const productId = usbDevice.productId?.replace("0x", "")
      const serialNumber = usbDevice.serialNumber?.replace("0x", "")
      const locationId = usbDevice.locationId?.split(" ")[0]
      const path =
        vendorId &&
        productId &&
        serialNumber &&
        `${vendorId}/${productId}/${serialNumber}`

      const mappedDevice: USBPortDevice = {
        ...usbDevice,
        productId,
        vendorId,
        serialNumber,
        locationId,
        path: path ?? "unknown",
      }

      if (filters && !isMatch(mappedDevice, filters)) {
        return filteredDevices
      }

      filteredDevices.push(mappedDevice)
      return filteredDevices
    }, [])
  }

  private static async getUSBDevice(): Promise<USBDevice[]> {
    const output = (await execPromise("system_profiler SPUSBDataType")) ?? ""
    const devices: Array<USBDevice> = []

    let currentDevice: USBDevice | null = null

    const productNamePattern = /^\s*(Mudita.*?):$/
    const lines = output.split("\n").filter((line) => line.trim() !== "")

    lines.forEach((line) => {
      const productNameMatch = productNamePattern.exec(line)
      if (productNameMatch) {
        if (currentDevice) {
          devices.push(currentDevice)
        }
        currentDevice = { name: productNameMatch[1] }
      }

      if (currentDevice) {
        for (const [key, regex] of Object.entries(fieldPatterns) as [
          keyof USBDevice,
          RegExp,
        ][]) {
          const match = regex.exec(line)
          if (match) {
            if (currentDevice[key]) {
              devices.push(currentDevice)
              currentDevice = null
              break
            }
            currentDevice[key] = match[1]
          }
        }
      }
    })

    if (currentDevice) {
      devices.push(currentDevice)
    }

    return devices
  }
}

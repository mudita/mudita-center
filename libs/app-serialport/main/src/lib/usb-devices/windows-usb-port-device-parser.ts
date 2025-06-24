/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execPromise } from "app-utils/main"
import { PortInfo } from "@serialport/bindings-interface"

interface BaseDeviceInfo {
  name: string
  deviceId: string
  manufacturer: string
  description: string
  service: string
}

export class WindowsUSBPortDeviceParser {
  static async listUsbDevices(): Promise<PortInfo[]> {
    const devices: PortInfo[] = []
    const baseDevicesInfo = await this.getBaseDevicesInfo()

    for (const device of baseDevicesInfo) {
      const portInfo = await this.getDetails(device)
      if (portInfo) {
        devices.push(portInfo)
      }
    }

    return devices
  }

  private static async getBaseDevicesInfo(): Promise<BaseDeviceInfo[]> {
    const stdout = await execPromise(
      `powershell -Command "Get-CimInstance Win32_PnPEntity | Where-Object { $_.DeviceID -like 'USB*' } | Select-Object Name, DeviceID, Manufacturer, Description, Service"`
    )
    if (!stdout) {
      return []
    }

    const devices: BaseDeviceInfo[] = []
    const deviceSections = stdout.trim().split(/(?=Name\s*:)/)

    deviceSections.forEach((section) => {
      const lines = section.split(/\n/)
      const device: Partial<BaseDeviceInfo> = {}

      lines.forEach((line) => {
        if (line.includes("DeviceID")) {
          device.deviceId = line.split(":")[1].trim()
        } else if (line.includes("Manufacturer")) {
          device.manufacturer = line.split(":")[1].trim()
        } else if (line.includes("Description")) {
          device.description = line.split(":")[1].trim()
        } else if (line.includes("Service")) {
          device.service = line.split(":")[1].trim()
        } else if (line.includes("Name")) {
          device.name = line.split(":")[1].trim()
        }
      })

      if (
        device.name &&
        device.deviceId &&
        device.manufacturer &&
        device.description &&
        device.service
      ) {
        devices.push(device as BaseDeviceInfo)
      }
    })

    return devices
  }

  private static async getDetails({
    deviceId,
  }: BaseDeviceInfo): Promise<PortInfo | undefined> {
    try {
      const vendorId = /VID_(\w+)/.exec(deviceId)?.[1]
      const productId = /PID_(\w+)/.exec(deviceId)?.[1]
      const serialNumber = deviceId.split("\\").pop()

      if (!vendorId || !productId || !serialNumber) {
        return undefined
      }

      return {
        vendorId,
        productId,
        serialNumber,
        path: `${vendorId}/${productId}/${serialNumber}`,
      } as PortInfo
    } catch {
      return undefined
    }
  }
}

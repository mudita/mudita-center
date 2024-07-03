/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ProductID, VendorID } from "Core/device/constants"
import { execPromise } from "shared/utils"
import { PortInfo } from "serialport"

interface DeviceInfo {
  name: string
  deviceId: string
  manufacturer: string
  description: string
  service: string
}

export const getHarmonyMSCDevice = (output: string): DeviceInfo | undefined => {
  const devices: DeviceInfo[] = []
  const deviceSections = output.trim().split(/(?=Name\s*:)/)

  deviceSections.forEach((section) => {
    const lines = section.split(/\n/)
    const device: Partial<DeviceInfo> = {}

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
      devices.push(device as DeviceInfo)
    }
  })

  return devices.find(
    (device) =>
      device.deviceId.includes(VendorID.MuditaHarmony) &&
      device.deviceId.includes(ProductID.MuditaHarmonyMsc)
  )
}

export const parseToPortInfo = (device: DeviceInfo): PortInfo => {
  const vendorId = /VID_(\w+)/.exec(device.deviceId)?.[1]
  const productId = /PID_(\w+)/.exec(device.deviceId)?.[1]
  const serialNumber = device.deviceId.split("\\").pop()

  return {
    path: `${vendorId}/${productId}/${serialNumber}`,
    manufacturer: "MUDITA",
    serialNumber: serialNumber,
    productId,
    vendorId,
  }
}

export const getUsbDevicesWindows = async (): Promise<PortInfo | void> => {
  try {
    const stdout = await execPromise(
      `powershell -Command "Get-CimInstance Win32_PnPEntity | Where-Object { $_.DeviceID -like 'USB*' } | Select-Object Name, DeviceID, Manufacturer, Description, Service"`
    )
    if (stdout) {
      const harmonyDevice = getHarmonyMSCDevice(stdout as string)
      if (harmonyDevice) {
        return parseToPortInfo(harmonyDevice)
      }
    }
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`)
  }
}

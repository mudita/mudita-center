/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ProductID, VendorID } from "Core/device/constants"
import { execPromise } from "shared/utils"
import { PortInfo } from "serialport"

interface DeviceDetails {
  [key: string]: string | undefined
  name?: string
  ProductID?: string
  VendorID?: string
  Version?: string
  SerialNumber?: string
  Speed?: string
  Manufacturer?: string
  LocationID?: string
  "CurrentAvailable(mA)"?: string
  "CurrentRequired(mA)"?: string
  "ExtraOperatingCurrent(mA)"?: string
}

export const getHarmonyMSCDevice = (output: string): DeviceDetails | null => {
  const devices: Array<DeviceDetails> = []
  const lines = output.trim().split("\n")
  let currentDevice: DeviceDetails = {}
  let currentKey = ""

  lines.forEach((line) => {
    if (line.trim() && !line.trim().endsWith(":")) {
      const [keyParts, ...valueParts] = line.trim().split(":")
      const key = keyParts.replaceAll(" ", "")
      const value = valueParts.join(":").trim()
      currentDevice[key] = value
    } else if (line.trim().endsWith(":")) {
      if (Object.keys(currentDevice).length) {
        devices.push({ name: currentKey, ...currentDevice })
        currentDevice = {}
      }
      currentKey = line.trim().slice(0, -1)
    }
  })

  if (Object.keys(currentDevice).length) {
    devices.push({ name: currentKey, ...currentDevice })
  }

  return (
    devices.find((device) => {
      if (device.VendorID && device.ProductID) {
        return (
          device.VendorID.includes(VendorID.MuditaHarmony) &&
          device.ProductID.includes(ProductID.MuditaHarmonyMsc)
        )
      }
      return null
    }) || null
  )
}

export const parseToPortInfo = (device: DeviceDetails): PortInfo => {
  const vendorId = device.VendorID!.replace("0x", "")
  const productId = device.ProductID!.replace("0x", "")
  const serialNumber = device.SerialNumber

  return {
    path: `${vendorId}/${productId}/${serialNumber}`,
    manufacturer: device.Manufacturer,
    serialNumber: device.SerialNumber,
    productId,
    vendorId,
    locationId: device.LocationID?.split(" ")[0],
  }
}

export const getUsbDevicesMacOS = async (): Promise<PortInfo | void> => {
  try {
    const stdout = await execPromise("system_profiler SPUSBDataType")
    if (stdout) {
      const harmonyDevice = getHarmonyMSCDevice(stdout)
      if (harmonyDevice) {
        return parseToPortInfo(harmonyDevice)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

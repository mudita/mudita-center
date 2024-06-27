/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { exec } from "child_process"
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

const getHarmonyMSCDevice = (output: string): DeviceDetails | null => {
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
          device.VendorID.includes("3310") && device.ProductID.includes("0103")
        )
      }
      return null
    }) || null
  )
}

const parseToPortInfo = (device: DeviceDetails): PortInfo => {
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

export const getUsbDevicesMacOS = (): Promise<PortInfo | void> => {
  return new Promise((resolve, reject) => {
    exec("system_profiler SPUSBDataType", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`)
        reject()
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`)
        resolve()
      }
      const harmonyDevice = getHarmonyMSCDevice(stdout)

      if (harmonyDevice) {
        const portInfo = parseToPortInfo(harmonyDevice)
        resolve(portInfo)
      } else {
        resolve()
      }
    })
  })
}

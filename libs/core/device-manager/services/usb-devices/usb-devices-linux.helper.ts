/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ExecException, exec } from "child_process"
import { PortInfo } from "serialport"

interface UsbDevice {
  bus: string
  device: string
  id: string
  description: string
}
const getHarmonyMSCDevice = (output: string): UsbDevice | undefined => {
  const devices: UsbDevice[] = output
    .trim()
    .split("\n")
    .map((line) => {
      const parts = line.split(" ")
      return {
        bus: parts[1].replace(/^0+/, ""),
        device: parts[3].slice(0, -1).replace(/^0+/, ""),
        id: parts[5],
        description: parts.slice(6).join(" "),
      }
    })
  return devices.find((device) => device.id === "3310:0103")
}

const getUsbDeviceDetails = (
  bus: string,
  device: string
): Promise<PortInfo> => {
  return new Promise((resolve, reject) => {
    exec(`lsusb -v -s ${bus}:${device}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`)
        return reject(error)
      }
      resolve(parseUsbDeviceDetails(stdout))
    })
  })
}
function parseUsbDeviceDetails(output: string): PortInfo {
  const lines = output.split("\n").map((line) => line.trim())
  const portInfo: Partial<PortInfo> = {}

  lines.forEach((line) => {
    if (line.startsWith("Bus")) {
      const parts = line.split(" ")
      portInfo.vendorId = parts[5].split(":")[0]
      portInfo.productId = parts[5].split(":")[1]
    } else if (line.startsWith("iManufacturer")) {
      portInfo.manufacturer = line.split(/\s+/).slice(2).join(" ")
    } else if (line.startsWith("iSerial")) {
      portInfo.serialNumber = line.split(/\s+/).slice(2).join(" ")
    }
  })
  portInfo.path = `${portInfo.vendorId}/${portInfo.productId}/${portInfo.serialNumber}`
  return portInfo as PortInfo
}

export const getUsbDevicesLinux = (): Promise<PortInfo | void> => {
  return new Promise((resolve, reject) => {
    exec("lsusb", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`)
        return reject()
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`)
        return reject()
      }

      const harmonyDevice = getHarmonyMSCDevice(stdout)
      if (harmonyDevice) {
        getUsbDeviceDetails(harmonyDevice.bus, harmonyDevice.device)
          .then((details) => {
            resolve(details)
          })
          .catch((error) => {
            reject()
          })
      } else {
        resolve()
      }
    })
  })
}

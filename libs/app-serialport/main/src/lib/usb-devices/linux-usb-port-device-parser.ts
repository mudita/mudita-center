/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execPromise } from "app-utils/main"
import { PortInfo } from "@serialport/bindings-interface"

interface LSUSBDeviceBasic {
  busID: string
  deviceId: string
}

export class LinuxUSBPortDeviceParser {
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

  private static async getBaseDevicesInfo(): Promise<LSUSBDeviceBasic[]> {
    const stdout = await execPromise("lsusb")
    if (!stdout) {
      return []
    }

    return stdout
      .trim()
      .split("\n")
      .map((line) => {
        const [, bus, , device] = line.trim().split(" ")
        return {
          busID: bus.replace(/^0+/m, ""),
          deviceId: device.replace(/^0+/m, "").replace(":", ""),
        }
      })
  }

  private static async getDetails({
    busID,
    deviceId,
  }: LSUSBDeviceBasic): Promise<PortInfo | undefined> {
    const portInfo: Partial<PortInfo> = {}

    const output = await execPromise(`lsusb -v -s ${busID}:${deviceId}`)
    if (!output) {
      return undefined
    }
    output
      .split("\n")
      .map((line) => line.trim())
      .forEach((line) => {
        if (line.startsWith("idVendor")) {
          portInfo.vendorId = line.split(/\W+/)[1].replace("0x", "")
        }
        if (line.startsWith("idProduct")) {
          portInfo.productId = line.split(/\W+/)[1].replace("0x", "")
        }
        if (line.startsWith("iManufacturer")) {
          portInfo.manufacturer = line.split(/\W+/).slice(2).join(" ")
        }
        if (line.startsWith("iSerial")) {
          portInfo.serialNumber = line.split(/\W+/)[2]
        }
      })
    portInfo.path = `${portInfo.vendorId}/${portInfo.productId}/${portInfo.serialNumber}`
    return portInfo as PortInfo
  }
}

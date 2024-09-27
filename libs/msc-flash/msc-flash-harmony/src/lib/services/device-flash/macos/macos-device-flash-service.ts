/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import IDeviceFlash from "../device-flash.interface"
import { execPromise } from "shared/utils"

interface DeviceDetails {
  [key: string]: string | undefined

  name?: string
  ProductID?: string
  VendorID?: string
  Version?: string
  SerialNumber?: string
  Manufacturer?: string
  BSDName?: string
}

class MacDeviceFlashService implements IDeviceFlash {
  async findDeviceByDeviceName(): Promise<string> {
    console.log(`Searching for device...`)
    const devices = await this.getDevices()

    const device = devices.find((device) => {
      return (
        device.VendorID?.includes("3310") && device.ProductID?.includes("0103")
      )
    })

    if (!device) {
      console.error(`Device with VendorID: 3310 and ProductID: 8233 not found.`)
      process.exit(1)
    }

    console.log(
      `Device found: VendorID=${device.VendorID}, ProductID=${device.ProductID}}`
    )
    console.log("Device details:", JSON.stringify(device, null, 2))

    return await this.getDiskIdentifier(device)
  }

  async execute(
    device: string,
    imagePath: string,
    scriptPath: string
  ): Promise<void> {
    console.log("flashing process starting")
    await this.flashImageToDevice(device, imagePath, scriptPath)
    console.log("Flash process completed successfully")
  }

  async flashImageToDevice(
    device: string,
    imagePath: string,
    scriptPath: string
  ): Promise<void> {
    // const scriptPath = "./static/macflash.sh"
    console.log("Script Path: ", scriptPath)
    console.log("Image Path: ", imagePath)
    console.log("Device: ", device)
    console.log(
      "Command: ",
      `osascript -e 'tell application "Terminal" to do script "\\"${scriptPath}\\" -i \\"${imagePath}\\" -d \\"${device}\\""'`
    )
    // await execPromise(`
    //   chmod +x "${scriptPath}"
    // `)
    await execPromise(
      `osascript -e 'tell application "Terminal" to do script "\\"${scriptPath}\\" -i \\"${imagePath}\\" -d \\"${device}\\""'`
    )
  }

  private async getDevices(): Promise<DeviceDetails[]> {
    const output = (await execPromise("system_profiler SPUSBDataType")) ?? ""
    const devices: Array<DeviceDetails> = []

    let currentDevice: DeviceDetails | null = null

    const fieldPatterns: { [key: string]: RegExp } = {
      ProductID: /^\s*Product ID:\s*(0x[0-9a-fA-F]+)$/,
      VendorID: /^\s*Vendor ID:\s*(0x[0-9a-fA-F]+)$/,
      Version: /^\s*Version:\s*([\d.]+)$/,
      SerialNumber: /^\s*Serial Number:\s*(\w+)$/,
      Speed: /^\s*Speed:\s*(.*)$/,
      Manufacturer: /^\s*Manufacturer:\s*(.*)$/,
      LocationID: /^\s*Location ID:\s*(0x[0-9a-fA-F]+ \/ \d+)$/,
      "CurrentAvailable(mA)": /^\s*Current Available \(mA\):\s*(\d+)$/,
      "CurrentRequired(mA)": /^\s*Current Required \(mA\):\s*(\d+)$/,
      "ExtraOperatingCurrent(mA)":
        /^\s*Extra Operating Current \(mA\):\s*(\d+)$/,
      BSDName: /^\s*BSD Name:\s*(disk[0-9a-zA-Z]+)$/,
    }

    const productNamePattern = /^\s*(Mudita.*?):$/
    const lines = output.split("\n").filter((line) => line.trim() !== "")

    lines.forEach((line) => {
      const productNameMatch = line.match(productNamePattern)
      if (productNameMatch) {
        if (currentDevice) {
          devices.push(currentDevice)
        }
        currentDevice = { name: productNameMatch[1] }
      }

      if (
        currentDevice &&
        !line.trim().startsWith("Media") &&
        !line.trim().startsWith("Volumes")
      ) {
        for (const [key, regex] of Object.entries(fieldPatterns)) {
          const match = line.match(regex)
          if (match) {
            if (key === "BSDName" && !currentDevice.BSDName) {
              currentDevice.BSDName = match[1]
            } else if (key !== "BSDName") {
              currentDevice[key] = match[1]
            }
          }
        }
      }
    })

    if (currentDevice) {
      devices.push(currentDevice)
    }

    return devices
  }

  private async getDiskIdentifier(device: DeviceDetails): Promise<string> {
    const bsdName = device.BSDName
    if (!bsdName) {
      throw new Error("BSD Name not found in device details.")
    }

    const diskUtilOutput = (await execPromise("diskutil list")) ?? ""
    const lines = diskUtilOutput.trim().split("\n")

    for (const line of lines) {
      const trimmedLine = line.trim()
      if (trimmedLine.startsWith("/dev/") && trimmedLine.includes(bsdName)) {
        return trimmedLine.split(" ")[0]
      }
    }

    throw new Error(`Disk identifier for BSD Name ${bsdName} not found.`)
  }
}

export default MacDeviceFlashService

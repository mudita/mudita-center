/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import fs from "fs"
import { execPromise } from "app-utils/main"
import IDeviceFlash, { FlashStatusType } from "../device-flash.interface"
import { MacosUSBPortDeviceParser } from "./macos-usb-port-device-parser/macos-usb-port-device-parser"
import { USBPortDevice } from "./macos-usb-port-device-parser/macos-usb-port-device-parser.interface"

class MacDeviceFlashService implements IDeviceFlash {
  async findDeviceByDeviceName(): Promise<string> {
    console.log(`Searching for device...`)
    const devices = await MacosUSBPortDeviceParser.getUSBPortDevices({
      vendorId: "3310",
      name: "Mudita Harmony (MSC mode)",
    })
    const device = devices[0]

    if (!device) {
      console.error(
        `Device with VendorID: 3310 and name: "Mudita Harmony (MSC mode)" not found.`
      )
      throw new Error(
        `Device with VendorID: 3310 and name: "Mudita Harmony (MSC mode)" not found.`
      )
    }

    console.log(
      `Device found: VendorID=${device.vendorId}, ProductID=${device.productId}, Version=${device.version}}`
    )
    console.log("Device details:", JSON.stringify(device, null, 2))

    return await this.getDiskIdentifier(device)
  }

  async execute(
    device: string,
    imagePath: string,
    scriptPath: string,
    mscHarmonyAbsoluteDir: string
  ): Promise<void> {
    console.log("flashing process starting")
    await this.flashImageToDevice(
      device,
      imagePath,
      scriptPath,
      mscHarmonyAbsoluteDir
    )
    console.log("Flash process completed successfully")
  }

  async flashImageToDevice(
    device: string,
    imagePath: string,
    scriptPath: string,
    mscHarmonyAbsoluteDir: string
  ): Promise<void> {
    const flashStatusTempFilePath = path.join(
      mscHarmonyAbsoluteDir,
      "flash-status.txt"
    )
    await execPromise(`
      chmod +x "${scriptPath}"
    `)
    const escapedScriptPath = scriptPath.replace(/"/g, '\\"')
    const escapedImagePath = imagePath.replace(/"/g, '\\"')
    const escapedDevice = device.replace(/"/g, '\\"')
    const escapedStatus = flashStatusTempFilePath.replace(/"/g, '\\"')

    const command =
      `osascript -e 'tell application "Terminal" to do script "` +
      `\\"${escapedScriptPath}\\" -i \\"${escapedImagePath}\\" -d \\"${escapedDevice}\\" -s \\"${escapedStatus}\\""` +
      `'`

    await execPromise(command)
  }

  async getFlashStatus(
    mscHarmonyAbsoluteDir: string
  ): Promise<FlashStatusType> {
    const flashStatusTempFilePath = path.join(
      mscHarmonyAbsoluteDir,
      "flash-status.txt"
    )

    try {
      const buffer = fs.readFileSync(flashStatusTempFilePath)
      return buffer.toString().trim() as FlashStatusType
    } catch (error) {
      console.error(`Error reading file: ${JSON.stringify(error)}. Retrying...`)
      return "FLASH_STATUS_IDLE"
    }
  }

  private async getDiskIdentifier(device: USBPortDevice): Promise<string> {
    const bsdName = device.bsdName
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

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import fs from "fs"
import {
  delay,
  execPromise,
  MacosUSBPortDeviceParser,
  USBPortDevice,
} from "shared/utils"
import IDeviceFlash, {
  waitForFlashCompletionOption,
} from "../device-flash.interface"

type FlashStatusType =
  | "FLASH_STATUS_COMPLETED"
  | "FLASH_STATUS_FAILED"
  | "FLASH_STATUS_IDLE"

class MacDeviceFlashService implements IDeviceFlash {
  private readonly flashStatusTempFilePath: string

  constructor(temporaryDirectoryPath: string) {
    this.flashStatusTempFilePath = path.join(
      temporaryDirectoryPath,
      "flash-status.txt"
    )
  }

  async findDeviceByDeviceName(): Promise<string> {
    console.log(`Searching for device...`)
    const devices = await MacosUSBPortDeviceParser.getUSBPortDevices()

    const device = devices.find((device) => {
      return device.name?.includes("Mudita Harmony (MSC mode)")
    })

    if (!device) {
      console.error(`Device with Name: "Mudita Harmony (MSC mode)" not found.`)
      throw new Error(
        `Device with Name: "Mudita Harmony (MSC mode)" not found.`
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
    await execPromise(`
      chmod +x "${scriptPath}"
    `)
    await execPromise(
      `osascript -e 'tell application "Terminal" to do script "\\"${scriptPath}\\" -i \\"${imagePath}\\" -d \\"${device}\\" -s \\"${this.flashStatusTempFilePath}\\""'`
    )
  }

  async waitForFlashCompletion(
    option: waitForFlashCompletionOption = {}
  ): Promise<boolean> {
    let flashStatus: FlashStatusType = "FLASH_STATUS_IDLE"
    const { intervalAttemptsLeft = 60, intervalTime = 5000, signal } = option

    if (intervalAttemptsLeft <= 0 || signal?.aborted) {
      throw new Error()
    }

    try {
      const buffer = fs.readFileSync(this.flashStatusTempFilePath)
      flashStatus = buffer.toString().trim() as FlashStatusType
    } catch (error) {
      console.error(`Error reading file: ${JSON.stringify(error)}. Retrying...`)
    }

    if (flashStatus === "FLASH_STATUS_COMPLETED") {
      return true
    } else if (flashStatus === "FLASH_STATUS_FAILED") {
      throw new Error()
    }

    await delay(intervalTime)

    return this.waitForFlashCompletion({
      intervalAttemptsLeft: intervalAttemptsLeft - 1,
      intervalTime,
      signal,
    })
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

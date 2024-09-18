/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { execCommand, execCommandWithSudo } from "shared/utils"
import IDeviceFlash from "./device-flash.interface"

function splitPathToDirnameAndBasename(currentPath: string) {
  const dirname = path.dirname(currentPath)
  const basename = path.basename(currentPath)
  return [dirname, basename]
}

class LinuxDeviceFlashService implements IDeviceFlash {
  async findDeviceByDeviceName(deviceName: string): Promise<string> {
    console.log(`Searching for device with model name: ${deviceName}`)
    const devices = await this.getDevices()

    for (const device of devices) {
      if (device.includes(deviceName)) {
        return device.split(" ")[0]
      }
    }
    console.error(`${deviceName} device model not found`)
    process.exit(1)
  }

  async execute(
    device: string,
    imagePath: string,
    scriptPath: string
  ): Promise<void> {
    await this.unmountDevice(device)
    await this.flashImageToDevice(device, imagePath, scriptPath)
    await this.ejectDevice(device)
    console.log("Flash process completed successfully")
  }

  async unmountDevice(device: string): Promise<void> {
    const partitions = await this.getPartitions(device)

    for (const partition of partitions) {
      await execCommand(`sudo umount /dev/${partition}`)
    }
  }

  async flashImageToDevice(
    device: string,
    imagePath: string,
    scriptPath: string
  ): Promise<void> {
    // TODO: Verify if try-catch block is necessary
    try {
      await execCommandWithSudo(`chmod +x ${scriptPath}`, {
        name: "Mudita Auto Flash",
      })
    } catch {
      /* empty */
    }

    const [path, scriptBasename] = splitPathToDirnameAndBasename(scriptPath)
    const [, imageBasename] = splitPathToDirnameAndBasename(imagePath)

    // TODO: Check if image basename is required for script execution
    await execCommand(
      `cd ${path} && sudo ./${scriptBasename} ${imageBasename} /dev/${device}`
    )
  }

  async ejectDevice(device: string): Promise<void> {
    await execCommand(`sudo eject /dev/${device}`)
  }

  private async getDevices(): Promise<string[]> {
    const devices = await execCommand("lsblk -o NAME,MODEL")

    return devices?.split("\n") ?? []
  }

  private async getPartitions(device: string): Promise<string[]> {
    const partitions = await execCommand(
      `lsblk /dev/${device} -o NAME,MOUNTPOINT`
    )

    return (
      partitions
        ?.split("\n")
        .filter((line) => line.includes(`/dev/${device}`) && line.includes("/"))
        .map((line) => line.split(" ")[0]) ?? []
    )
  }
}

export default LinuxDeviceFlashService

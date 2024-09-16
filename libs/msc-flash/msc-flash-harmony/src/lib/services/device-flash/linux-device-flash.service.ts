/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import IDeviceFlash from "./device-flash.interface"
import { execPromise } from "shared/utils"

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
      await execPromise(`sudo umount /dev/${partition}`)
    }
  }

  async flashImageToDevice(
    device: string,
    imagePath: string,
    scriptPath: string
  ): Promise<void> {
    await execPromise(`sudo chmod +x ${scriptPath}`)
    await execPromise(`sudo ${scriptPath} ${imagePath} /dev/${device}`)
  }

  async ejectDevice(device: string): Promise<void> {
    await execPromise(`sudo eject /dev/${device}`)
  }

  private async getDevices(): Promise<string[]> {
    const devices = await execPromise("lsblk -o NAME,MODEL")

    return devices?.split("\n") ?? []
  }

  private async getPartitions(device: string): Promise<string[]> {
    const partitions = await execPromise(
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

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { execPromise, execCommandWithSudo } from "shared/utils"
import IDeviceFlash from "./device-flash.interface"
import LinuxPartitionParser from "Libs/msc-flash/msc-flash-harmony/src/lib/services/device-flash/linux-partition-parser"

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
    const unmountDeviceCommand = await this.getUnmountDeviceCommand(device)
    const flashImageToDeviceCommand = await this.getFlashImageToDeviceCommand(
      device,
      imagePath,
      scriptPath
    )
    const ejectDeviceCommand = await this.getEjectDeviceCommand(device)

    const command = `${unmountDeviceCommand} && ${flashImageToDeviceCommand} && ${ejectDeviceCommand}`
    await execCommandWithSudo(command, { name: "Mudita Auto Flash" })

    console.log("Flash process completed successfully")
  }

  private async getUnmountDeviceCommand(device: string): Promise<string> {
    const partitions = await this.getPartitions(device)
    const partitionsString = partitions
      .map((partition) => `/dev/${partition}`)
      .join(" ")

    return `umount -f ${partitionsString}`
  }

  private async getFlashImageToDeviceCommand(
    device: string,
    imagePath: string,
    scriptPath: string
  ): Promise<string> {
    const [path, scriptBasename] =
      this.splitPathToDirnameAndBasename(scriptPath)
    const [, imageBasename] = this.splitPathToDirnameAndBasename(imagePath)
    return `chmod +x ${scriptPath} && cd ${path} && ./${scriptBasename} ${imageBasename} /dev/${device}`
  }

  private async getEjectDeviceCommand(device: string): Promise<string> {
    return `eject /dev/${device}`
  }

  private async getDevices(): Promise<string[]> {
    const devices = await execPromise("lsblk -o NAME,MODEL")

    return devices?.split("\n") ?? []
  }

  private async getPartitions(device: string): Promise<string[]> {
    const partitions = await execPromise(
      `lsblk /dev/${device} -o NAME,MOUNTPOINT`
    )
    return LinuxPartitionParser.parsePartitions(partitions ?? "")
  }

  private splitPathToDirnameAndBasename(currentPath: string) {
    const dirname = path.dirname(currentPath)
    const basename = path.basename(currentPath)
    return [dirname, basename]
  }
}

export default LinuxDeviceFlashService

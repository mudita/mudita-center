/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { execPromise, execCommandWithSudo } from "shared/utils"
import IDeviceFlash from "./device-flash.interface"

function splitPathToDirnameAndBasename(currentPath: string) {
  const dirname = path.dirname(currentPath)
  const basename = path.basename(currentPath)
  return [dirname, basename]
}

function extractPartitions(input: string): string[] {
  const lines = input.split("\n")
  const partitions: string[] = []

  for (const line of lines) {
    const trimmedLine = line.trim()

    if (
      !trimmedLine ||
      trimmedLine.startsWith("NAME") ||
      trimmedLine.startsWith("MOUNTPOINT") ||
      trimmedLine === "sdb"
    ) {
      continue
    }

    const lineWithoutTree = trimmedLine.replace(/^[^\w]*([\w\d]+)/, "$1")

    const partitionNameMatch = lineWithoutTree.match(/^(\S+)/)
    if (partitionNameMatch) {
      const partitionName = partitionNameMatch[1]
      if (partitionName && partitionName !== "sdb") {
        partitions.push(partitionName)
      }
    }
  }

  return partitions
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
    const unmountDeviceCommand = await this.getUnmountDeviceCommand(device)
    const flashImageToDeviceCommand = await this.getFlashImageToDeviceCommand(
      device,
      imagePath,
      scriptPath
    )
    const ejectDeviceCommand = await this.getEjectDeviceCommand(device)
    console.log("Flash process completed successfully")
    await execCommandWithSudo(
      `${unmountDeviceCommand} && ${flashImageToDeviceCommand} && ${ejectDeviceCommand} `,
      {
        name: "Mudita Auto Flash",
      }
    )
  }

  async getUnmountDeviceCommand(device: string): Promise<string> {
    const partitions = await this.getPartitions(device)
    const partitionsString = partitions
      .map((partition) => `/dev/${partition}`)
      .join(" ")

    return `umount ${partitionsString}`
  }

  async getFlashImageToDeviceCommand(
    device: string,
    imagePath: string,
    scriptPath: string
  ): Promise<string> {
    const [path, scriptBasename] = splitPathToDirnameAndBasename(scriptPath)
    const [, imageBasename] = splitPathToDirnameAndBasename(imagePath)
    return `chmod +x ${scriptPath} && cd ${path} && ./${scriptBasename} ${imageBasename} /dev/${device}`
  }

  async getEjectDeviceCommand(device: string): Promise<string> {
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

    return extractPartitions(partitions ?? "")
  }
}

export default LinuxDeviceFlashService

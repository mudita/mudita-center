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
  const lines = input.split('\n');
  const partitions: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('NAME') || trimmedLine.startsWith('MOUNTPOINT') || trimmedLine === 'sdb') {
      continue;
    }

    const lineWithoutTree = trimmedLine.replace(/^[^\w]*([\w\d]+)/, '$1');

    const partitionNameMatch = lineWithoutTree.match(/^(\S+)/);
    if (partitionNameMatch) {
      const partitionName = partitionNameMatch[1];
      if (partitionName && partitionName !== 'sdb') {
        partitions.push(partitionName);
      }
    }
  }

  return partitions;
}

const options = {
  name: "Mudita Auto Flash",
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
      await execCommandWithSudo(`umount /dev/${partition}`, options)
    }
  }

  async flashImageToDevice(
    device: string,
    imagePath: string,
    scriptPath: string
  ): Promise<void> {
    await execCommandWithSudo(`chmod +x ${scriptPath}`, options)

    const [path, scriptBasename] = splitPathToDirnameAndBasename(scriptPath)
    const [, imageBasename] = splitPathToDirnameAndBasename(imagePath)

    try {
      await execCommandWithSudo(
        `cd ${path} && ./${scriptBasename} ${imageBasename} /dev/${device}`
      , options)
    } catch (error) {
      console.error("Flash process successfully failed with error: ", error)
    }
  }

  async ejectDevice(device: string): Promise<void> {
    await execCommandWithSudo(`eject /dev/${device}`, options)
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

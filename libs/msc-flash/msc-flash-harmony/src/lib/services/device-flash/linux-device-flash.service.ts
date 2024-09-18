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
    console.log("unmountDevice")
    const partitions = await this.getPartitions(device)
    console.log(`partitions.length`)
    console.log(`${partitions.length}`)

    for (const partition of partitions) {
      console.log("unmountDevice")
      console.log("unmountDevice", partition)
      await execPromise(`sudo umount /dev/${partition}`, true)
    }
  }

  async flashImageToDevice(
    device: string,
    imagePath: string,
    scriptPath: string
  ): Promise<void> {
    await execCommandWithSudo(`chmod +x ${scriptPath}`, {
      name: "Mudita Auto Flash",
    })

    const [path, scriptBasename] = splitPathToDirnameAndBasename(scriptPath)
    const [, imageBasename] = splitPathToDirnameAndBasename(imagePath)

    try {
      await execCommandWithSudo(
        `cd ${path} && ./${scriptBasename} ${imageBasename} /dev/${device}`, {
          name: "Mudita Auto Flash",
        }
      )
    } catch (error) {
      console.error("Flash process successfully failed with error: ", error)
    }

    // try {
    //   await execPromise(
    //     `cd ${path} && sudo ./${scriptBasename} ${imageBasename} /dev/${device}`, true
    //   )
    //   console.log("flashImageToDevice 2")
    // }
    // catch (e){
    //   console.log(`flashImageToDevice Flash process failed with error: ${e}`)
    // }
  }

  async ejectDevice(device: string): Promise<void> {
    await execPromise(`sudo eject /dev/${device}`, true)
  }

  private async getDevices(): Promise<string[]> {
    const devices = await execPromise("lsblk -o NAME,MODEL", true)

    return devices?.split("\n") ?? []
  }

  private async getPartitions(device: string): Promise<string[]> {
    const partitions = await execPromise(
      `lsblk /dev/${device} -o NAME,MOUNTPOINT`, true
    )

    console.log("JSON.stringify(partitions, null, 2)")
    console.log(JSON.stringify(partitions, null, 2))

    return (
      partitions
        ?.split("\n")
        .filter((line) => line.includes(`/dev/${device}`) && line.includes("/"))
        .map((line) => line.split(" ")[0]) ?? []
    )
  }
}

export default LinuxDeviceFlashService

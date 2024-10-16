/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  execCommandWithSudo,
  execPromise,
  splitPathToDirNameAndBaseName,
} from "shared/utils"
import IDeviceFlash from "../device-flash.interface"

interface DiskInformation {
  DiskNumber: number
  FriendlyName: string
  Size: string
  OperationalStatus: string
}

class WindowsDeviceFlashService implements IDeviceFlash {
  async findDeviceByDeviceName(deviceName: string): Promise<string> {
    console.log(
      `Searching for the device with the friendly name: ${deviceName}`
    )

    const getDiskResult = await execPromise(
      `powershell.exe -Command "Get-Disk | Where-Object { $_.FriendlyName -eq '${deviceName}' }| ConvertTo-Json"`
    )

    if (!getDiskResult) {
      throw new Error(`Disk not found for friendly name: ${deviceName}`)
    }

    const diskInformation: DiskInformation = JSON.parse(getDiskResult)

    console.log(
      `Disk information retrieved successfully: Disk Number - ${diskInformation.DiskNumber}, Size - ${diskInformation.Size} bytes, Status - ${diskInformation.OperationalStatus}`
    )

    return String(diskInformation.DiskNumber)
  }

  async execute(
    device: string,
    imagePath: string,
    scriptPath: string
  ): Promise<void> {
    await this.flashDevice(device, imagePath, scriptPath)
    console.log("Flash process completed successfully")
  }

  private async flashDevice(
    device: string,
    imagePath: string,
    scriptPath: string
  ): Promise<void> {
    const [path, scriptBasename] = splitPathToDirNameAndBaseName(scriptPath)
    const [, imageBasename] = splitPathToDirNameAndBaseName(imagePath)
    const command = `cd ${path} && powershell.exe -ExecutionPolicy Bypass -File ${scriptBasename} -file ${imageBasename} -diskid ${device} -force`

    try {
      await execCommandWithSudo(command)
    } catch (error) {
      throw new Error(
        `An error occurred during flashing: ${JSON.stringify(error)}`
      )
    }
  }
}

export default WindowsDeviceFlashService

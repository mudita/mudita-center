/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "types-preload"
import {
  SerialPortChangedDevices,
  SerialPortDeviceInfo,
  SerialPortDevicePath,
  SerialPortDeviceType,
  SerialPortRequest,
  SerialPortResponse,
} from "app-serialport/models"
import { SerialPortError } from "app-serialport/utils"

export class AppSerialPort {
  static onDevicesChanged(
    callback: (changes: SerialPortChangedDevices) => void
  ) {
    window.api.serialPort.onDevicesChanged(callback)
  }

  static getCurrentDevices(): Promise<SerialPortDeviceInfo[]> {
    return window.api.serialPort.getCurrentDevices()
  }

  static async changeBaudRate(path: SerialPortDevicePath, baudRate: number) {
    await window.api.serialPort.changeBaudRate(path, baudRate)
  }

  static isCompatible(
    device: Pick<SerialPortDeviceInfo, "deviceType">
  ): device is SerialPortDeviceInfo {
    if (!Object.values(SerialPortDeviceType).includes(device.deviceType)) {
      throw new Error("Device type is not supported")
    }
    return true
  }

  static async request(
    device: Pick<SerialPortDeviceInfo, "deviceType" | "path">,
    data: SerialPortRequest
  ): Promise<SerialPortResponse> {
    try {
      this.isCompatible(device)
      return await window.api.serialPort.request(device.path, data)
    } catch (error) {
      throw new SerialPortError(error)
    }
  }
}

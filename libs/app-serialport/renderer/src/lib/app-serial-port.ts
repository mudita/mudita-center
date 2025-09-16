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

export const AppSerialPort = {
  onDevicesChanged: (callback: (changes: SerialPortChangedDevices) => void) => {
    window.api.serialPort.onDevicesChanged(callback)
  },
  getCurrentDevices: (): Promise<SerialPortDeviceInfo[]> => {
    return window.api.serialPort.getCurrentDevices()
  },
  changeBaudRate: async (path: SerialPortDevicePath, baudRate: number) => {
    await window.api.serialPort.changeBaudRate(path, baudRate)
  },
  isCompatible: (
    device: Pick<SerialPortDeviceInfo, "deviceType">
  ): device is SerialPortDeviceInfo => {
    if (!Object.values(SerialPortDeviceType).includes(device.deviceType)) {
      throw new Error("Device type is not supported")
    }
    return true
  },
  request: async (
    device: Pick<SerialPortDeviceInfo, "deviceType" | "path">,
    data: SerialPortRequest
  ): Promise<SerialPortResponse> => {
    try {
      AppSerialPort.isCompatible(device)
      return await window.api.serialPort.request(device.path, data)
    } catch (error) {
      throw new SerialPortError(error)
    }
  },
  freeze: (path: SerialPortDevicePath, timeout?: number) => {
    window.api.serialPort.freeze(path, timeout)
  },
  unfreeze: (path: SerialPortDevicePath) => {
    window.api.serialPort.unfreeze(path)
  },
  isFrozen: (path: SerialPortDevicePath) => {
    return window.api.serialPort.isFrozen(path)
  },
}

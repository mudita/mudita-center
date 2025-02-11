/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortChangedDevices,
  SerialPortDeviceInfo,
  SerialPortDevicePath,
  SerialPortDeviceType,
  SerialPortIpcEvents,
  SerialPortRequest,
  SerialPortResponse,
} from "app-serialport/models"
import { AppSerialPortErrors } from "./app-serial-port-errors"

export class AppSerialPort {
  static onDevicesChanged(
    callback: (changes: SerialPortChangedDevices) => void
  ) {
    return window.electron.ipcRenderer.on(
      SerialPortIpcEvents.DevicesChanged,
      (_, changes) => {
        callback(changes)
      }
    )
  }

  static async changeBaudRate(
    path: SerialPortDevicePath,
    baudRate: number
  ): Promise<void> {
    return await window.electron.ipcRenderer.invoke(
      SerialPortIpcEvents.ChangeBaudRate,
      path,
      baudRate
    )
  }

  static isCompatible(
    device: SerialPortDeviceInfo
  ): device is SerialPortDeviceInfo {
    if (!Object.values(SerialPortDeviceType).includes(device.deviceType)) {
      throw new Error("Device type is not supported")
    }
    return true
  }

  static async request(
    device: SerialPortDeviceInfo,
    data: SerialPortRequest
  ): Promise<SerialPortResponse> {
    try {
      this.isCompatible(device)
      return await window.electron.ipcRenderer.invoke(
        SerialPortIpcEvents.Request,
        device.path,
        data
      )
    } catch (error) {
      if (error instanceof Error) {
        for (const AppSerialPortError of Object.values(AppSerialPortErrors)) {
          const predefinedError = new AppSerialPortError(error.message)
          if (predefinedError.parse()) {
            throw predefinedError
          }
        }
        throw error
      }
      throw error
    }
  }
}

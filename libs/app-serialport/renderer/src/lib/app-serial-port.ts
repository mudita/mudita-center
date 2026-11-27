/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import type {} from "types-preload"
import {
  SerialPortChangedDevices,
  SerialPortDeviceId,
  SerialPortDeviceInfo,
  SerialPortDeviceType,
  SerialPortRequest,
  SerialPortResponse,
} from "app-serialport/models"
import { SerialPortError } from "app-serialport/utils"

export const AppSerialPort = {
  onDevicesChanged: (callback: (changes: SerialPortChangedDevices) => void) => {
    return window.api.serialPort.onDevicesChanged(callback)
  },
  getCurrentDevices: (): Promise<SerialPortDeviceInfo[]> => {
    return window.api.serialPort.getCurrentDevices()
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
    device: Pick<SerialPortDeviceInfo, "deviceType" | "id">,
    data: SerialPortRequest
  ): Promise<SerialPortResponse> => {
    try {
      AppSerialPort.isCompatible(device)
      return await window.api.serialPort.request(device.id, data)
    } catch (error) {
      throw new SerialPortError(error)
    }
  },
  freeze: (id: SerialPortDeviceId, duration?: number) => {
    window.api.serialPort.freeze(id, duration)
  },
  unfreeze: (id: SerialPortDeviceId) => {
    window.api.serialPort.unfreeze(id)
  },
  /**
   * `undefined` means the main process holds no such device - not that the
   * device is running. Anything waiting for a freeze has to tell the two
   * apart, or it waits on a device that can no longer answer.
   */
  isFrozen: (id: SerialPortDeviceId): Promise<boolean | undefined> => {
    return window.api.serialPort.isFrozen(id)
  },
  reset: (id?: SerialPortDeviceId) => {
    window.api.serialPort.reset(id)
  },
}

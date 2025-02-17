/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortChangedDevices,
  SerialPortDevicePath,
  SerialPortIpcEvents,
  SerialPortRequest,
  SerialPortResponse,
} from "app-serialport/models"
import { IpcRenderer, IpcRendererEvent } from "electron"

export interface IpcAppSerialport extends IpcRenderer {
  on(
    channel: SerialPortIpcEvents.DevicesChanged,
    callback: (event: IpcRendererEvent, data: SerialPortChangedDevices) => void
  ): this
  invoke<R>(
    channel: SerialPortIpcEvents.Request,
    path: SerialPortDevicePath,
    data: SerialPortRequest
  ): Promise<SerialPortResponse<R>>
}

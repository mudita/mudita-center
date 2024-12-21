/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortChangedDevices, SerialPortIpcEvents } from "app-serialport/models"
import { IpcRenderer, IpcRendererEvent } from "electron"

export interface IpcAppSerialport extends IpcRenderer {
  on(
    channel: SerialPortIpcEvents.DevicesChanged,
    callback: (event: IpcRendererEvent, data: SerialPortChangedDevices) => void
  ): this
  invoke(
    channel: SerialPortIpcEvents.Request,
    path: string,
    data: string
  ): Promise<void>
}

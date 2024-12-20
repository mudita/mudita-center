/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChangedDevices, SerialportIpcEvents } from "app-serialport/models"
import { IpcRenderer, IpcRendererEvent } from "electron"

export interface IpcAppSerialport extends IpcRenderer {
  on(
    channel: SerialportIpcEvents.Change,
    callback: (event: IpcRendererEvent, data: ChangedDevices) => void
  ): this
  invoke(
    channel: SerialportIpcEvents.Write,
    path: string,
    data: string
  ): Promise<void>
}

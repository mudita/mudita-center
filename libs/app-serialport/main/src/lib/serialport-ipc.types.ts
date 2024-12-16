/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialportIpcEvents } from "app-serialport/models"
import { PortInfo } from "@serialport/bindings-interface"
import { IpcRenderer } from "electron"

export interface IpcAppSerialport extends IpcRenderer {
  invoke(channel: SerialportIpcEvents.List): Promise<PortInfo[]>
  invoke(
    channel: SerialportIpcEvents.Write,
    path: string,
    data: string
  ): Promise<void>
}

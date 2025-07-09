/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron"
import { AppResult } from "app-utils/models"
import { UsbAccessIpcEvents } from "app-init/models"

export const usbAccessPreload = {
  hasSerialPortAccess: (): Promise<AppResult<boolean>> =>
    ipcRenderer.invoke(UsbAccessIpcEvents.HasSerialPortAccess),
  grantAccessToSerialPort: (): Promise<AppResult> =>
    ipcRenderer.invoke(UsbAccessIpcEvents.GrantAccessToSerialPort),
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import { PortInfo } from "@serialport/bindings-interface"
import { AppMtpIpcEvents } from "app-mtp/models"

export const appMtp = {
  getMtpDeviceId: (portInfo: Partial<PortInfo>) => {
    return electronAPI.ipcRenderer.invoke(
      AppMtpIpcEvents.GetMtpDeviceId,
      portInfo
    )
  },
}

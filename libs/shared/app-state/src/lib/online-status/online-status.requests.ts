/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcOnlineStatusEvent } from "./online-status.event"

export const updateOnlineStatusRequest = (value: boolean): Promise<void> =>
  ipcRenderer.callMain(IpcOnlineStatusEvent.UpdateOnlineStatus, value)

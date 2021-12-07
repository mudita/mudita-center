/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcMusic } from "Renderer/modules/music/ipc-event.enum"
import { FileInformation } from "Renderer/modules/music/mtp-connect.listener"

export const mtpConnectRequest = async (): Promise<FileInformation[]> => {
  return ipcRenderer.callMain(IpcMusic.MtpConnect)
}

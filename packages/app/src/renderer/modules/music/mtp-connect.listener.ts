/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcMusic } from "Renderer/modules/music/ipc-event.enum"

export const registerMtpConnectListener = (): void => {
  ipcMain.answerRenderer(IpcMusic.MtpConnect, () => {
    console.log("mtpConnect request: ", )
    return
  })
}

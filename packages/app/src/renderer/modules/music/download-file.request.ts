/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcMusic } from "Renderer/modules/music/ipc-event.enum"

export const downloadFileRequest = async (data: {id: string, path: string}): Promise<{
  status: 1 | 0
  error?: any
}> => {
  return ipcRenderer.callMain(IpcMusic.DownloadFile, data)
}

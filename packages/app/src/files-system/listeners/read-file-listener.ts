/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs, { PathOrFileDescriptor } from "fs"
import { ipcMain } from "electron-better-ipc"
import { IpcFileSystem } from "App/files-system/constants/ipc-files-system.enum"

const registerReadFileListener = (): void => {
  ipcMain.answerRenderer<PathOrFileDescriptor, Uint8Array | undefined>(
    IpcFileSystem.ReadFile,
    (path) => {
      return fs.readFileSync(path)
    }
  )
}

export default registerReadFileListener

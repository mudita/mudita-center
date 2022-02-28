/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcFileSystem } from "App/file-system/constants/ipc-file-system.enum"
import fs, { PathLike } from "fs"

export const unlinkSync = (path: PathLike): void => {
  return fs.unlinkSync(path)
}

const registerUnlinkFileListener = (): void => {
  ipcMain.answerRenderer<PathLike, void>(
    IpcFileSystem.UnlinkFile,
    unlinkSync
  )
}

export default registerUnlinkFileListener

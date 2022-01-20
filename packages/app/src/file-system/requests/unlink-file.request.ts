/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcFileSystem } from "App/file-system/constants"
import { PathLike } from "fs"

const unlinkFile = async (
  path: PathLike
): Promise<void> => {
  return await ipcRenderer.callMain(IpcFileSystem.UnlinkFile, path)
}

export default unlinkFile

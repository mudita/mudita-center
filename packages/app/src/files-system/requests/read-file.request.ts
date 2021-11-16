/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PathOrFileDescriptor } from "fs"
import { ipcRenderer } from "electron-better-ipc"
import { IpcFileSystem } from "App/files-system/constants"

const readFile = async (
  path: PathOrFileDescriptor
): Promise<Uint8Array | undefined> => {
  return await ipcRenderer.callMain(IpcFileSystem.ReadFile, path)
}

export default readFile

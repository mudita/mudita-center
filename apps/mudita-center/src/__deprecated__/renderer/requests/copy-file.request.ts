/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { CopyFileEvents } from "App/__deprecated__/main/functions/register-copy-file-listener"
import { CopyData } from "App/__deprecated__/main/utils/copy-file"

const copyFile = async (data: CopyData): Promise<boolean> => {
  return ipcRenderer.callMain(CopyFileEvents.Copy, data)
}

export default copyFile

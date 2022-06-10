/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import copyFile, { CopyData } from "App/__deprecated__/main/utils/copy-file"

export enum CopyFileEvents {
  Copy = "copy",
}

const registerCopyFileListener = (): void => {
  ipcMain.answerRenderer<CopyData, boolean>(CopyFileEvents.Copy, copyFile)
}

export default registerCopyFileListener

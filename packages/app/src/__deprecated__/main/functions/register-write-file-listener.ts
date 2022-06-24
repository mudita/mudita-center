/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import writeFile, { WriteData } from "App/__deprecated__/main/utils/write-file"

export enum WriteFileEvents {
  Write = "write",
}

const registerWriteFileListener = (): void => {
  ipcMain.answerRenderer<WriteData, boolean>(WriteFileEvents.Write, writeFile)
}

export default registerWriteFileListener

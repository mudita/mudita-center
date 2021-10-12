/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import { ipcMain } from "electron-better-ipc"

export enum ReadFileEvents {
  Read = "read-file",
}

export interface ReadFilesData {
  file: string
}

const registerReadFileListener = (): void => {
  ipcMain.answerRenderer<ReadFilesData, Promise<Buffer | undefined>>(
    ReadFileEvents.Read,
    async ({ file }) => {
      return fs.readFileSync(file)
    }
  )
}

export default registerReadFileListener

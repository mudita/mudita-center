/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import fs from "fs"

export enum WriteFileEvents {
  Write = "write",
}

export interface WriteData {
  data: string
  filePath: string
  fileName: string
}

const registerWriteFileListener = (): void => {
  ipcMain.answerRenderer<WriteData, boolean>(
    WriteFileEvents.Write,
    ({ data, filePath, fileName }) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, {
            recursive: true,
          })
        }
        console.log("WriteData: ", fileName)
        fs.writeFileSync(`${filePath}/${fileName}`, data)
        return true
      } catch {
        return false
      }
    }
  )
}

export default registerWriteFileListener

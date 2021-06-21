/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import fs, { RmDirOptions } from "fs"

export enum RmdirEvents {
  Rmdir = "rmdir",
}

export interface RmdirProps {
  filePath: string
  options: RmDirOptions
}

const registerRmdirListener = (): void => {
  ipcMain.answerRenderer<RmdirProps, boolean>(
    RmdirEvents.Rmdir,
    ({ filePath, options }) => {
      try {
        if (fs.existsSync(filePath)) {
          fs.rmdirSync(filePath, options)
        }
        return true
      } catch {
        return false
      }
    }
  )
}

export default registerRmdirListener

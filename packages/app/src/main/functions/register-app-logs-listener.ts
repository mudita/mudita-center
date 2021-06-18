/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs-extra"
import { ipcMain } from "electron-better-ipc"
import path from "path"
import logger, { logsPath } from "App/main/utils/logger"

export enum AppLogsEvents {
  Get = "get-app-logs",
}

const registerAppLogsListeners = (): void => {
  ipcMain.answerRenderer(AppLogsEvents.Get, async () => {
    const logs: string[] = []
    try {
      const files = await fs.readdir(logsPath)
      for (const fileName of files) {
        if (/^mc-.*\.log$/.test(fileName)) {
          const log = await fs.readFile(path.join(logsPath, fileName), "utf-8")
          logs.push(`========== ${fileName} ==========`)
          logs.push(log + "\n")
        }
      }
    } catch (error) {
      logger.error(error)
    }
    return logs.join("\n")
  })
}

export default registerAppLogsListeners

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import fs from "fs-extra"
import { ipcMain } from "electron-better-ipc"
import { name } from "../../../package.json"
import { app } from "electron"
import logger from "App/main/utils/logger"
import path from "path"

export enum AppLogsEvents {
  Get = "get-app-logs",
}

const registerAppLogsListeners = () => {
  ipcMain.answerRenderer(AppLogsEvents.Get, async () => {
    const logs: string[] = []
    try {
      const logsPath = `${app.getPath("appData")}/${name}/logs`
      const files = await fs.readdir(logsPath)

      for (const fileName of files) {
        if (/^pda-.*\.log$/.test(fileName)) {
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

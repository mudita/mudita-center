/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import logger, { logsPath } from "App/__deprecated__/main/utils/logger"
import { mergeToSingleFileString } from "App/__deprecated__/main/utils/merge-to-single-file-string/merge-to-single-file-string"

export enum AppLogsEvents {
  Get = "get-app-logs",
}

const registerAppLogsListeners = (): void => {
  ipcMain.answerRenderer(AppLogsEvents.Get, (maxSize?: number) => {
    try {
      return mergeToSingleFileString({
        cwd: logsPath,
        fileNameRegExp: /^mc-.*\.log$/,
        fileNameDivider: true,
        maxSize,
      })
    } catch (error) {
      logger.error(
        `Application Logs: getting logs fail. Data: ${JSON.stringify(error)}`
      )
    }

    return ""
  })
}

export default registerAppLogsListeners

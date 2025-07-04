/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import {
  AggregateLogsToFileOptions,
  AppLoggerIpcEvents,
} from "app-utils/models"
import { AppLoggerService } from "./app-logger.service"

export const initAppLogger = (ipcMain: IpcMain) => {
  ipcMain.removeHandler(AppLoggerIpcEvents.AggregateLogsToFile)
  ipcMain.handle(
    AppLoggerIpcEvents.AggregateLogsToFile,
    (_, options: AggregateLogsToFileOptions) => {
      return AppLoggerService.aggregateLogsToFile(options)
    }
  )
}

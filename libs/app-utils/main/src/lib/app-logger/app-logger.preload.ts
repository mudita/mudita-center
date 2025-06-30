/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import {
  AggregateLogsToFileOptions,
  AppLoggerIpcEvents,
  AppResult,
} from "app-utils/models"

export const appLogger = {
  aggregateLogsToFile: (
    options: AggregateLogsToFileOptions
  ): Promise<AppResult> =>
    electronAPI.ipcRenderer.invoke(
      AppLoggerIpcEvents.AggregateLogsToFile,
      options
    ),
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import logger from "electron-log/main"
import * as path from "path"
import { app } from "electron"
import {
  APP_LOGGER_SCOPE,
  APP_LOGGER_SCOPE_RELATIVE_PATH,
} from "app-utils/models"
import { LevelOption } from "electron-log"

const getLogFileName = () => {
  const now = new Date()
  return [
    "mudita-center",
    `${now.getFullYear()}`,
    `${now.getUTCMonth()}`.padStart(2, "0"),
    `${now.getUTCDate()}`.padStart(2, "0"),
  ].join("-")
}

logger.transports.file.resolvePathFn = () => {
  return path.join(
    app.getPath(APP_LOGGER_SCOPE),
    APP_LOGGER_SCOPE_RELATIVE_PATH,
    `${getLogFileName()}.log`
  )
}

const devLogLevel = (process.env.SERIALPORT_LOGS_LEVEL ||
  "silly") as LevelOption

logger.transports.file.level =
  process.env.NODE_ENV === "development" ? devLogLevel : "debug"
logger.transports.console.level =
  process.env.NODE_ENV === "development" ? devLogLevel : false
logger.transports.console.useStyles = true

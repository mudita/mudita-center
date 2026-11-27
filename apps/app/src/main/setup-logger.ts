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

const isDev =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"

// The file transport writes on the main thread. Left synchronous, every log
// line during a transfer is time the event loop is not serving the device -
// which is how the logging of a request ends up producing its own timeout.
// Asynchronous writes are batched; a hard kill can lose the last batch.
logger.transports.file.sync = false
logger.transports.file.level = isDev ? devLogLevel : "debug"
logger.transports.console.level = isDev ? devLogLevel : false
logger.transports.console.useStyles = true

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

const getLogFileName = () => {
  return [
    "mudita-center",
    `${new Date().getFullYear()}`,
    `${new Date().getUTCMonth()}`.padStart(2, "0"),
    `${new Date().getUTCDate()}`.padStart(2, "0"),
  ].join("-")
}

logger.transports.file.resolvePathFn = () => {
  return path.join(
    app.getPath(APP_LOGGER_SCOPE),
    APP_LOGGER_SCOPE_RELATIVE_PATH,
    `${getLogFileName()}.log`
  )
}
logger.transports.file.level =
  process.env.NODE_ENV === "development" ? "silly" : "debug"

logger.transports.console.level =
  process.env.NODE_ENV === "development" ? "silly" : "error"

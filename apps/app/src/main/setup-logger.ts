/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import logger from "electron-log/main"
import * as path from "path"
import { app } from "electron"

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
    app.getPath("userData"),
    "new-logs",
    `${getLogFileName()}.log`
  )
}
/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Logger from "./logger"

let logger: Logger

export class LoggerFactory {
  public static getInstance(): Logger {
    if (!logger) {
      logger = new Logger()
    }

    return logger
  }
}

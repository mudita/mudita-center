/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Logger, { PureLogger } from "./logger.js"

let logger: PureLogger

export class LoggerFactory {
  public static getInstance(): PureLogger {
    if (!logger) {
      logger = new Logger()
    }

    return logger
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Logger } from "App/core/services"
import { DeviceLogger } from "App/core/types"

let logger: DeviceLogger

export class LoggerFactory {
  public static getInstance(): DeviceLogger {
    if (!logger) {
      logger = new Logger()
    }

    return logger
  }
}

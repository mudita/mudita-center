/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Logger } from "Core/core/services"
import { DeviceLogger } from "Core/core/types"

let logger: DeviceLogger

export class LoggerFactory {
  public static getInstance(): DeviceLogger {
    if (!logger) {
      logger = new Logger()
    }

    return logger
  }
}

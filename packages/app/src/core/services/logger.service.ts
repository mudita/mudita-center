/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceLogger, ConsoleLogger } from "App/core/types"

export class Logger implements DeviceLogger {
  private enabled = false
  private logger: ConsoleLogger = console

  /**
   * The method allows registering custom loggers in runtime.
   * Default is as global.console
   */
  registerLogger(logger: ConsoleLogger): void {
    this.logger = logger
  }

  toggleLogs(enabled: boolean): void {
    this.enabled = enabled
  }

  info(message: string): void {
    if (this.enabled) {
      this.logger.info(message)
    }
  }
}

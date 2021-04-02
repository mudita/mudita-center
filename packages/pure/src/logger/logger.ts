/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface ConsoleLogger {
  info: (message: string) => void
}

export interface PureLogger {
  registerLogger(console: ConsoleLogger): void
  toggleLogs(enabled: boolean): void
  info(message: string): void
}

class Logger implements PureLogger {
  #enabled = false
  #logger: ConsoleLogger = console

  /**
   * The method allows registering custom loggers in runtime.
   * Default is as global.console
   */
  registerLogger(logger: ConsoleLogger): void {
    this.#logger = logger
  }

  toggleLogs(enabled: boolean): void {
    this.#enabled = enabled
  }

  info(message: string): void {
    if (this.#enabled) {
      this.#logger.info(message)
    }
  }
}

export default Logger

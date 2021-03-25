/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface PureLogger {
  info: (message: string) => void
}

class Logger {
  #enabled = false
  #logger: PureLogger = console;

  registerLogger(logger: PureLogger): void {
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

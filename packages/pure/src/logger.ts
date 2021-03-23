/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

class Logger {
  #enabled = false

  toggleLogs(enabled: boolean): void {
    this.#enabled = enabled
  }

  log(message: string): void {
    if (this.#enabled) {
      console.log(message)
    }
  }
}

export default Logger

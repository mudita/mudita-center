/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

class Logger {
  toggleLogs(): void {}

  log(message: string): void {
    console.log(message)
  }
}

export default new Logger()

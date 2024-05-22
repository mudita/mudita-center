/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface ConsoleLogger {
  info: (message: string) => void
}

export interface DeviceLogger {
  registerLogger(console: ConsoleLogger): void
  toggleLogs(enabled: boolean): void
  info(message: string): void
}

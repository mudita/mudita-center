/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import logger, { LogLevel } from "electron-log"

type Color =
  | "unset"
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white"
  | "gray"

interface Options {
  color?: Color
  devOnly?: boolean
  doNotTrim?: boolean
  addNewLine?: boolean
}

export class AppLogger {
  static log(level: LogLevel, message: string, options?: Options) {
    if (options?.devOnly && process.env.NODE_ENV !== "development") {
      return
    }

    logger[level](...this.format(message, level, options))
  }

  private static format(
    message: string,
    level: LogLevel,
    options?: Options
  ): string[] {
    const color = this.getColor(level, options?.color)

    let msg = options?.doNotTrim ? message : this.trimMessage(message)

    if (options?.addNewLine) {
      if (!msg.endsWith("\n")) {
        msg += "\n"
      }
    }

    return [`%c[${level.toUpperCase()}] ${msg}`, `color: ${color}`]
  }

  private static trimMessage(message: string): string {
    const limit = AppLogger.getLimit()
    if (message.length > limit) {
      return message.slice(0, limit) + "..."
    }
    return message
  }

  private static getColor(level: LogLevel, customColor?: Color): Color {
    if (customColor) {
      return customColor
    }

    switch (level) {
      case "error":
        return "red"
      case "warn":
        return "yellow"
      case "info":
        return "blue"
      case "verbose":
        return "cyan"
      case "debug":
        return "magenta"
      case "silly":
        return "gray"
      default:
        return "unset"
    }
  }

  private static getLimit(): number {
    if (process.env.SERIALPORT_LOG_LIMIT) {
      const limit = parseInt(process.env.SERIALPORT_LOG_LIMIT, 10)
      if (!isNaN(limit) && limit >= 0) {
        return limit
      }
    }
    return Infinity
  }
}

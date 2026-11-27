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

/**
 * A message that costs something to build - serializing a request, a response
 * or the device list. Handed over unevaluated so a line nothing will write
 * costs nothing to not write.
 */
type Message = string | (() => string)

/**
 * Longest message written without `doNotTrim`. The transport writes to disk
 * on the main thread, so an unbounded line is time the event loop spends not
 * serving the device - and a response body is as long as the device wants it
 * to be.
 */
const DEFAULT_MESSAGE_LIMIT = 2_000

const LEVELS: LogLevel[] = [
  "error",
  "warn",
  "info",
  "verbose",
  "debug",
  "silly",
]

export class AppLogger {
  static log(level: LogLevel, message: Message, options?: Options) {
    if (options?.devOnly && process.env.NODE_ENV !== "development") {
      return
    }

    if (!this.isLevelEnabled(level)) {
      return
    }

    logger[level](
      ...this.format(
        typeof message === "function" ? message() : message,
        level,
        options
      )
    )
  }

  /**
   * Whether any transport would write this level. Mirrors electron-log's own
   * comparison, down to an unconfigured transport accepting everything.
   */
  private static isLevelEnabled(level: LogLevel): boolean {
    const transports = logger.transports as
      | Record<string, { level?: LogLevel | false } | undefined>
      | undefined

    if (!transports) {
      return true
    }

    const entries = Object.values(transports).filter(Boolean)

    if (entries.length === 0) {
      return true
    }

    const requested = LEVELS.indexOf(level)

    return entries.some((transport) => {
      const transportLevel = transport?.level

      if (transportLevel === false) {
        return false
      }

      const allowed = LEVELS.indexOf(transportLevel as LogLevel)

      return allowed === -1 || requested === -1 || requested <= allowed
    })
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
      if (!isNaN(limit) && limit > 0) {
        return limit
      }
    }
    return DEFAULT_MESSAGE_LIMIT
  }
}

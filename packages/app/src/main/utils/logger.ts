/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { createLogger, format, transports } from "winston"
import { name } from "../../../package.json"
import path from "path"
import { getAppSettings } from "Renderer/requests/app-settings.request"
const DailyRotateFile = require("winston-daily-rotate-file")
const isRenderer = require("is-electron-renderer")
const RollbarTransport = require("winston-transport-rollbar-3")

const testing = process.env.NODE_ENV === "test"

let app: { getPath: (arg0: string) => string }
let type: string

if (isRenderer) {
  ;({ app } = require("electron").remote)
  type = "renderer"
} else {
  ;({ app } = require("electron"))
  type = "main"
}

const { combine, timestamp, printf, colorize, simple } = format

const myFormat = combine(
  timestamp(),
  printf(({ level, message, timestamp }) => {
    const paddedProcess = `[${type}]`.padEnd(10, " ")
    const paddedLevel = `[${level}]:`.padEnd(8, " ")
    return `${paddedProcess} [${timestamp}] ${paddedLevel} ${message}`
  })
)

const loggerCreator = (enableRollbar = false) => {
  return createLogger({
    level: "info",
    format: format.combine(format.metadata(), format.json()),
    exitOnError: false,
    transports: [
      ...(app
        ? [
            new DailyRotateFile({
              dirname: path.join(app.getPath("appData"), name, "logs"),
              filename: "mc-%DATE%",
              extension: ".log",
              datePattern: "YYYY-MM-DD",
              maxFiles: 3,
              maxSize: "1m",
              level: "info",
              format: myFormat,
            }),
          ]
        : []),
      new transports.Console({
        level: testing ? "emerg" : "silly",
        silent: testing,
        format: combine(colorize(), simple()),
      }),
      ...(enableRollbar
        ? [
            new RollbarTransport({
              rollbarConfig: {
                accessToken: process.env.ROLLBAR_TOKEN || "test",
                captureUncaught: true,
                captureUnhandledRejections: true,
                payload: {
                  environment: process.env.NODE_ENV,
                },
              },
              level: "warn",
            }),
          ]
        : []),
    ],
  })
}

class Logger {
  private rollbarEnabled = false
  private logger = loggerCreator(this.rollbarEnabled)

  public init() {
    ;(async () => {
      if (isRenderer) {
        this.rollbarEnabled = Boolean(
          (await getAppSettings()).appCollectingData
        )
      }
      this.rollbarEnabled ? this.enableRollbar() : this.disableRollbar()
    })()

    return this
  }

  public enableRollbar() {
    this.logger = loggerCreator(true)
  }
  public disableRollbar() {
    this.logger = loggerCreator(false)
  }
  public getLogger() {
    return this.logger
  }
}

export const LoggerService = new Logger().init()

const logger = LoggerService.getLogger()

export default logger

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { createLogger, format, transports } from "winston"
import { name } from "../../../package.json"
const DailyRotateFile = require("winston-daily-rotate-file")
const isRenderer = require("is-electron-renderer")
const RollbarTransport = require("winston-transport-rollbar-3")

const testing = process.env.NODE_ENV === "test"

let app
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

const logger = createLogger({
  level: "info",
  format: format.combine(format.metadata(), format.json()),
  exitOnError: false,
  transports: [
    ...(app
      ? [
          new DailyRotateFile({
            dirname: `${app.getPath("appData")}/${name}/logs`,
            filename: "pda-%DATE%",
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
  ],
})

export default logger

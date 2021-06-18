/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createLogger, format, Logger, transports } from "winston"
import path from "path"
import getAppPath, {
  AppResolver,
  AppType,
  resolve,
} from "App/main/utils/get-app-path"

const DailyRotateFile = require("winston-daily-rotate-file")
const RollbarTransport = require("winston-transport-rollbar-3")
const testing = process.env.NODE_ENV === "test"
const { combine, timestamp, printf, colorize, simple } = format

// TODO: This type should only have some of the log methods instead of using the full Winston’s interface.
type AppLogger = Logger & {
  enableRollbar: () => void
  disableRollbar: () => void
}

export const logsPath = path.join(getAppPath(), "logs")

const createDailyRotateFileTransport = (type: AppType) => {
  const format = combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
      const paddedProcess = `[${type}]`.padEnd(10, " ")
      const paddedLevel = `[${level}]:`.padEnd(8, " ")
      return `${paddedProcess} [${timestamp}] ${paddedLevel} ${message}`
    })
  )
  return new DailyRotateFile({
    dirname: logsPath,
    filename: "mc-%DATE%",
    extension: ".log",
    datePattern: "YYYY-MM-DD",
    maxFiles: 3,
    maxSize: "1m",
    level: "info",
    format,
  })
}
const consoleTransport = new transports.Console({
  level: testing ? "emerg" : "silly",
  silent: testing,
  format: combine(colorize(), simple()),
})

// TODO: test this. https://appnroll.atlassian.net/browse/PDA-764
export const createAppLogger = (resolveApp: AppResolver): AppLogger => {
  const { app, type } = resolveApp()
  const transports = [
    ...(app ? [createDailyRotateFileTransport(type)] : []),
    consoleTransport,
  ]

  const rollbarTransport = new RollbarTransport({
    rollbarConfig: {
      accessToken: process.env.ROLLBAR_TOKEN || "test",
      captureUncaught: true,
      captureUnhandledRejections: true,
      enabled: false,
      payload: {
        environment: process.env.NODE_ENV,
      },
      scrubTelemetryInputs: true,
      autoInstrument: {
        network: false,
        log: false,
        dom: true,
        navigation: true,
        connectivity: false,
        contentSecurityPolicy: false,
        errorOnContentSecurityPolicy: false,
      },
      captureIp: "anonymize",
    },
    level: "warn",
  })

  const appLogger = createLogger({
    level: "info",
    format: format.combine(format.metadata(), format.json()),
    exitOnError: false,
    transports,
  })
  const enableRollbar = () => {
    appLogger.add(rollbarTransport)
    rollbarTransport.rollbar.configure({ enabled: true })
  }
  const disableRollbar = () => {
    appLogger.remove(rollbarTransport)
    rollbarTransport.rollbar.configure({ enabled: false })
  }
  return Object.assign(appLogger, {
    enableRollbar,
    disableRollbar,
  })
}
const logger = createAppLogger(resolve)
export default logger

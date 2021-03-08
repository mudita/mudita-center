/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { createLogger, format, transports, Logger } from "winston"
import { name } from "../../../package.json"
import path from "path"
const DailyRotateFile = require("winston-daily-rotate-file")
const RollbarTransport = require("winston-transport-rollbar-3")
const testing = process.env.NODE_ENV === "test"
const { combine, timestamp, printf, colorize, simple } = format
type AppType = "main" | "renderer"
type AppResolver = () => { type: AppType; appDataPath: string }
// TODO: This type should only have some of the log methods instead of using the full Winston’s interface.
type AppLogger = Logger & {
  enableRollbar: () => void
  disableRollbar: () => void
}

const createDailyRotateFileTransport = (appDataPath: string, type: AppType) => {
  const format = combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
      const paddedProcess = `[${type}]`.padEnd(10, " ")
      const paddedLevel = `[${level}]:`.padEnd(8, " ")
      return `${paddedProcess} [${timestamp}] ${paddedLevel} ${message}`
    })
  )
  return new DailyRotateFile({
    dirname: path.join(appDataPath, name, "logs"),
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
const resolve: AppResolver = () => {
  const isRenderer = require("is-electron-renderer")
  const app = isRenderer
    ? require("electron").remote.app
    : require("electron").app
  const type = isRenderer ? "renderer" : "main"
  return {
    appDataPath: app.getPath("appData"),
    type,
  }
}
// TODO: test this. https://appnroll.atlassian.net/browse/PDA-764
export const createAppLogger = (resolveApp: AppResolver): AppLogger => {
  const { appDataPath, type } = resolveApp()
  const transports = [
    // TODO: previously this condition was based on `app`. Why it was possible for the app to not be there?
    ...(appDataPath ? [createDailyRotateFileTransport(appDataPath, type)] : []),
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

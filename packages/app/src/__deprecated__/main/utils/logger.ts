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
} from "App/__deprecated__/main/utils/get-app-path"
import { getMetadataStore } from "App/metadata/containers"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const DailyRotateFile = require("winston-daily-rotate-file")
// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const RollbarTransport = require("winston-transport-rollbar-3")
const testing = process.env.NODE_ENV === "test"
const { combine, timestamp, printf, colorize, simple } = format

// TODO: This type should only have some of the log methods instead of using the full Winston’s interface.
export type AppLogger = Logger & {
  enableRollbar: () => void
  disableRollbar: () => void
  updateMetadata: () => void
}

export const logsPath = path.join(getAppPath(), "logs")

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let defaultMeta: any | null = {}

const createDailyRotateFileTransport = (
  type: AppType,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultMetadata: any
) => {
  const format = combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
      const paddedProcess = `[${type}]`.padEnd(10, " ")
      const paddedLevel = `[${level}]:`.padEnd(8, " ")
      const metadata = `\n[metadata]:\n${Object.entries(defaultMetadata)
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .map(([key, value]) => (value ? `${key}: ${value}` : ""))
        .filter((item) => item)
        .join("\n")}`
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `${paddedProcess} [${timestamp}] ${paddedLevel} ${message} ${metadata}`
    })
  )
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return new DailyRotateFile({
    dirname: logsPath,
    filename: "mc-%DATE%",
    extension: ".log",
    datePattern: "YYYY-MM-DD",
    maxFiles: 10,
    maxSize: "1d",
    level: "info",
    format,
  })
}

const consoleTransport = new transports.Console({
  level: testing ? "emerg" : "silly",
  silent: testing,
  format: combine(colorize(), simple()),
})

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
let dailyRotateFileTransport = createDailyRotateFileTransport(
  AppType.Main,
  defaultMeta
)

// TODO: test this. https://appnroll.atlassian.net/browse/PDA-764
export const createAppLogger = (resolveApp: AppResolver): AppLogger => {
  const { app, type } = resolveApp()
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  dailyRotateFileTransport = createDailyRotateFileTransport(type, defaultMeta)

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
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
        scrubFields: ["phoneNumber"],
      },
      captureIp: "anonymize",
    },
    level: "warn",
  })

  const appLogger = createLogger({
    level: "info",
    format: format.combine(format.metadata(), format.json()),
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    defaultMeta,
    exitOnError: false,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    transports: [...(app ? [dailyRotateFileTransport] : []), consoleTransport],
  })
  const enableRollbar = () => {
    appLogger.add(rollbarTransport)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    rollbarTransport.rollbar.configure({ enabled: true })
  }
  const disableRollbar = () => {
    appLogger.remove(rollbarTransport)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    rollbarTransport.rollbar.configure({ enabled: false })
  }
  const updateMetadata = () => {
    const tmpMetadata = getMetadataStore().metadata ?? {}
    defaultMeta = Object.fromEntries(tmpMetadata)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    appLogger.defaultMeta = defaultMeta
    appLogger.remove(dailyRotateFileTransport)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    dailyRotateFileTransport = createDailyRotateFileTransport(type, defaultMeta)
    appLogger.add(dailyRotateFileTransport)
  }
  return Object.assign(appLogger, {
    enableRollbar,
    disableRollbar,
    updateMetadata,
  })
}
const logger = createAppLogger(resolve)
export default logger

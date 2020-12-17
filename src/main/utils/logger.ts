import { createLogger, format, transports } from "winston"
import { name } from "../../../package.json"
const DailyRotateFile = require("winston-daily-rotate-file")
const isRenderer = require("is-electron-renderer")
const RollbarTransport = require("winston-transport-rollbar-3")

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
      level: "silly",
      format: combine(colorize(), simple()),
    }),
    new RollbarTransport({
      rollbarConfig: {
        accessToken: process.env.ROLLBAR_TOKEN,
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

import { ElectronLog } from "electron-log"

let log: Console | ElectronLog

if (window.require) {
  log = window.require("electron-log")
  // TODO: add a Rollbar
} else {
  log = console
}

export default log

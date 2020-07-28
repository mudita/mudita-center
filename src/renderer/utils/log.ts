let log: Console

if (window.require) {
  log = window.require("electron-log")
  // TODO: add a remote url to send logs to the specified the server or use Rollbar
  // See also src/main/main.ts
  // log.transports.remote.level = "warn"
  // log.transports.remote.url = "http://localhost:3000/log"
} else {
  log = console
}

export default log

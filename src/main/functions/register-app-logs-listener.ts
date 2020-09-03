import fs from "fs-extra"
import log from "electron-log"
import { ipcMain } from "electron-better-ipc"

export enum AppLogsEvents {
  Get = "get-app-logs",
}

const registerAppLogsListeners = () => {
  ipcMain.answerRenderer(
    AppLogsEvents.Get,
    (path: string = log.transports.file.getFile().path) => {
      return `${fs.readFileSync(path)}`
    }
  )
}

export default registerAppLogsListeners

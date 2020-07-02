import fs from "fs-extra"
import log from "electron-log"
import { ipcMain } from "electron-better-ipc"

export enum AppLogsEvents {
  Get = "get-app-logs",
}

const registerAppLogsListeners = () => {
  ipcMain.answerRenderer(AppLogsEvents.Get, () => {
    return `${fs.readFileSync(log.transports.file.getFile().path)}`
  })
}

export default registerAppLogsListeners

import { ipcMain } from "electron-better-ipc"
import fetch from "node-fetch"
import { app } from "electron"
import { name } from "../../../package.json"

export enum OsUpdateChannel {
  Request = "os-update-request",
}

const osUpdateServerUrl =
  "https://mudita-desktop-app.s3-eu-central-1.amazonaws.com/pure-os/latest.json"

const registerPureOsUpdateListener = () => {
  ipcMain.answerRenderer(OsUpdateChannel.Request, async () => {
    const response = await fetch(osUpdateServerUrl)
    const { file, ...rest } = await response.json()
    return {
      file: `${app.getPath("appData")}/${name}/pure/os/downloads/${file}`,
      ...rest,
    }
  })
}

export default registerPureOsUpdateListener

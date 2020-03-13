import { ipcMain } from "electron-better-ipc"
import fetch from "node-fetch"

export enum OsUpdateChannel {
  Request = "os-update-request",
}

const osUpdateServerUrl =
  "https://mudita-desktop-app.s3-eu-central-1.amazonaws.com/pure-os/latest.json"

const registerPureOsUpdateListener = () => {
  ipcMain.answerRenderer(OsUpdateChannel.Request, async () => {
    const response = await fetch(osUpdateServerUrl)
    return await response.json()
  })
}

export default registerPureOsUpdateListener

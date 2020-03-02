import { ipcMain } from "electron-better-ipc"
import fetch from "node-fetch"

export enum OsUpdateChannel {
  Request = "os-update-request",
}

const osUpdateServerUrl =
  "https://mudita-desktop-app.s3-eu-central-1.amazonaws.com/pure-os/latest.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVLNHCTENZY3X4VS4/20200302/eu-central-1/s3/aws4_request&X-Amz-Date=20200302T114104Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=ff675a92887b2e0815859cb9cd581c446e581460329ca4c985c9febbb09084a8"

const registerPureOsUpdateListener = () => {
  ipcMain.answerRenderer(OsUpdateChannel.Request, async () => {
    const response = await fetch(osUpdateServerUrl)
    return await response.json()
  })
}

export default registerPureOsUpdateListener

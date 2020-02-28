import { ipcMain } from "electron-better-ipc"
import fetch from "node-fetch"

export enum OsUpdateChannel {
  Request = "os-update-request",
}

const osUpdateServerUrl =
  "https://mudita-desktop-app.s3-eu-central-1.amazonaws.com/pure-os/latest.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVLNHCTENZY3X4VS4/20200226/eu-central-1/s3/aws4_request&X-Amz-Date=20200226T154632Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=c1828bee0234273169782d83691facbbbd2fb8baeee304454a88c0b97bdeb09a"

const registerPureOsUpdateListener = () => {
  ipcMain.answerRenderer(OsUpdateChannel.Request, async () => {
    const response = await fetch(osUpdateServerUrl)
    return await response.json()
  })
}

export default registerPureOsUpdateListener

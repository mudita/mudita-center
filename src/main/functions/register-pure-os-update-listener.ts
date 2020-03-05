import { ipcMain } from "electron-better-ipc"
import fetch from "node-fetch"

export enum OsUpdateChannel {
  Request = "os-update-request",
}

// TODO: Replace the temporary link with the final one after changing S3 read access to public
const osUpdateServerUrl =
  "https://mudita-desktop-app.s3-eu-central-1.amazonaws.com/pure-os/latest.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVLNHCTENZY3X4VS4/20200305/eu-central-1/s3/aws4_request&X-Amz-Date=20200305T153234Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=584e080b386ab2de1d7127a0fd25a1793d72c9c6ad733178949dbc48a939fc78"

const registerPureOsUpdateListener = () => {
  ipcMain.answerRenderer(OsUpdateChannel.Request, async () => {
    const response = await fetch(osUpdateServerUrl)
    return await response.json()
  })
}

export default registerPureOsUpdateListener

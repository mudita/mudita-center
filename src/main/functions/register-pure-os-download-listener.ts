import { ipcMain } from "electron-better-ipc"
import {
  DownloadFinished,
  DownloadListener,
} from "App/main/functions/create-download-listener-registrar"
import { app } from "electron"
import { name } from "../../../package.json"

export enum PureOsDownloadChannel {
  Start = "os-download-start",
  Progress = "os-download-progress",
  Cancel = "os-download-cancel",
  Done = "os-download-finished",
}

const registerPureOsDownloadListener = (
  registerDownloadListener: (
    params: DownloadListener
  ) => Promise<DownloadFinished>
) => {
  ipcMain.answerRenderer(
    PureOsDownloadChannel.Start,
    ({ url }: { url: string }) => {
      return registerDownloadListener({
        url,
        path: `${app.getPath("appData")}/${name}/pure-os/`,
        channels: PureOsDownloadChannel,
      })
    }
  )
}

export default registerPureOsDownloadListener

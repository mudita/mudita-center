import { ipcMain } from "electron-better-ipc"
import { app } from "electron"
import { name } from "../../../package.json"
import {
  DownloadFinished,
  DownloadListener,
} from "Renderer/interfaces/file-download.interface"

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

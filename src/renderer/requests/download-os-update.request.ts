import { ipcRenderer } from "electron-better-ipc"
import { PureOsDownloadChannels } from "App/main/functions/register-pure-os-download-listener"
import {
  DownloadFinished,
  DownloadStatus,
} from "Renderer/interfaces/file-download.interface"

export const cancelOsDownload = (interrupt = false) => {
  ipcRenderer.send(PureOsDownloadChannels.cancel, interrupt)
}

const downloadOsUpdateRequest = (url: string): Promise<DownloadFinished> => {
  return new Promise(async (resolve, reject) => {
    const data: DownloadFinished = await ipcRenderer.callMain(
      PureOsDownloadChannels.start,
      url
    )

    data.status === DownloadStatus.Completed ? resolve(data) : reject(data)
  })
}

export default downloadOsUpdateRequest

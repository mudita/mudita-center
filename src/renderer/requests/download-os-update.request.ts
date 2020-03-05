import { ipcRenderer } from "electron-better-ipc"
import { PureOsDownloadChannels } from "App/main/functions/register-pure-os-download-listener"
import {
  Filename,
  DownloadFinished,
  DownloadStatus,
} from "Renderer/interfaces/file-download.interface"

export const cancelOsDownload = (interrupt = false) => {
  ipcRenderer.send(PureOsDownloadChannels.cancel, interrupt)
}

const downloadOsUpdateRequest = (
  filename: Filename
): Promise<DownloadFinished> => {
  return new Promise(async (resolve, reject) => {
    const data: DownloadFinished = await ipcRenderer.callMain(
      PureOsDownloadChannels.start,
      {
        // TODO: Replace the temporary link with the final one after changing S3 read access to public
        url: `https://mudita-desktop-app.s3-eu-central-1.amazonaws.com/pure-os/${filename}`,
        filename,
      }
    )

    data.status === DownloadStatus.Completed ? resolve(data) : reject(data)
  })
}

export default downloadOsUpdateRequest

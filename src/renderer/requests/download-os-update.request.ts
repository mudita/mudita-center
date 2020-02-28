import { ipcRenderer } from "electron-better-ipc"
import {
  DownloadFinished,
  DownloadStatus,
  Filename,
} from "App/main/functions/register-download-listener"
import { PureOsDownloadChannel } from "App/main/functions/register-pure-os-download-listener"

export const cancelOsDownload = () => {
  ipcRenderer.send(PureOsDownloadChannel.Cancel)
}

const downloadOsUpdateRequest = (
  filename: Filename
): Promise<DownloadFinished> => {
  return new Promise(async (resolve, reject) => {
    const data: DownloadFinished = await ipcRenderer.callMain(
      PureOsDownloadChannel.Start,
      {
        url: `https://mudita-desktop-app.s3-eu-central-1.amazonaws.com/pure-os/${filename}?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVLNHCTENZY3X4VS4/20200221/eu-central-1/s3/aws4_request&X-Amz-Date=20200221T153012Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=82579e455cd4f9c740423073e072c74c8403274ce0c16c93c4903cd8fb029348`,
      }
    )

    data.status === DownloadStatus.Completed ? resolve(data) : reject(data)
  })
}

export default downloadOsUpdateRequest

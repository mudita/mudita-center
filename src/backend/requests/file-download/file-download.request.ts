import Adapters from "Backend/adapters/adapters.interface"
import DownloadInfo from "Common/interfaces/file-download-info.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron"

const handleFileDownload = ({ app }: Adapters, url: string): DownloadInfo => {
  const directory = app.getPath("userData") + "/downloads/"

  ipcRenderer.send("web-request", {
    protocol: "http:",
    hostname: "00.cba.pl",
    path: "/pda/latest.json",
  })

  ipcRenderer.send("download", {
    url,
    properties: { directory },
  })

  ipcRenderer.on("download complete", (event, file) => {
    console.log(file) // Full file path
  })

  return {
    directory,
    progress: {
      percent: 100,
      totalBytes: 12345,
      transferredBytes: 12345,
    },
  }
}

const registerFileDownloadRequest = createEndpoint({
  name: IpcRequest.DownloadFile,
  handler: handleFileDownload,
})

export default registerFileDownloadRequest

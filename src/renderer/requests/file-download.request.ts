// import DownloadInfo from "Common/interfaces/file-download-info.interface"
import { ipcRenderer } from "electron-better-ipc"
// import { IpcRequest } from "Common/requests/ipc-request.enum"
// import { webContents } from "electron"
//
// const downloadFile = (url: string): Promise<DownloadInfo> =>
//   ipcRenderer.callMain(IpcRequest.DownloadFile, { url }) as Promise<
//     DownloadInfo
//   >

const downloadFile = (url: string) => {
  ipcRenderer.on("web-request-reply", (event, arg) => {
    console.log(arg) // prints "pong"
  })
  ipcRenderer.send("web-request", { url: "http://00.cba.pl/pda/latest.json" })
  //
  // ipcRenderer.send("download", { url })
  //
  // ipcRenderer.on("download complete", (event, data) => {
  //   console.log(event)
  //   console.log(data)
  // })
}

export default downloadFile

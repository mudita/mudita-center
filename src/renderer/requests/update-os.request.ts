import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"

const updateOs = (updateFilePath: string): any => {
  return ipcRenderer.callMain(IpcRequest.UpdateOs, updateFilePath)
}

export default updateOs

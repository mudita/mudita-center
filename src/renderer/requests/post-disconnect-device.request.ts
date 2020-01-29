import DisconnectInfo from "Common/interfaces/disconnect-info"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"

const postDisconnectDevice = (): Promise<DisconnectInfo> =>
  ipcRenderer.callMain(IpcRequest.PostDisconnectDevice) as Promise<
    DisconnectInfo
  >

export default postDisconnectDevice

import DisconnectInfo from "Common/interfaces/disconnect-info"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"

const getDisconnectInfo = (): Promise<DisconnectInfo> =>
  ipcRenderer.callMain(IpcRequest.GetDisconnectInfo) as Promise<DisconnectInfo>

export default getDisconnectInfo

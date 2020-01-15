import NetworkInfo from "Common/interfaces/network-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"

const getNetworkInfo = (): Promise<NetworkInfo> =>
  ipcRenderer.callMain(IpcRequest.GetNetworkInfo) as Promise<NetworkInfo>

export default getNetworkInfo

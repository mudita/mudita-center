import ChangeSimInfo from "Common/interfaces/change-sim-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"

const getChangeSimRequest = (): Promise<ChangeSimInfo> =>
  ipcRenderer.callMain(IpcRequest.GetChangeSimInfo) as Promise<ChangeSimInfo>

export default getChangeSimRequest

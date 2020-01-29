import ChangeSimInfo from "Common/interfaces/change-sim-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"

const changeSimRequest = (): Promise<ChangeSimInfo> =>
  ipcRenderer.callMain(IpcRequest.ChangeSim) as Promise<ChangeSimInfo>

export default changeSimRequest

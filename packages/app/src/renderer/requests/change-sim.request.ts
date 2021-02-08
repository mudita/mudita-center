import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"

const changeSimRequest = (): Promise<DeviceResponse> =>
  ipcRenderer.callMain(IpcRequest.ChangeSim)

export default changeSimRequest

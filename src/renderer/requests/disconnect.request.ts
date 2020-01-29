import DisconnectStatus from "Common/interfaces/disconnect-status"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"

const disconnectDevice = (): Promise<DisconnectStatus> =>
  ipcRenderer.callMain(IpcRequest.DisconnectDevice) as Promise<DisconnectStatus>

export default disconnectDevice

import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"

const disconnectDevice = (): Promise<DeviceResponse> =>
  ipcRenderer.callMain(IpcRequest.DisconnectDevice) as Promise<DeviceResponse>

export default disconnectDevice

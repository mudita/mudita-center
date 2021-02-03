import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"

const connectDevice = (): Promise<DeviceResponse> =>
  ipcRenderer.callMain(IpcRequest.ConnectDevice)

export default connectDevice

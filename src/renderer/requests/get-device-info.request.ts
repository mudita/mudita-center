import DeviceInfo from "Common/interfaces/device-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"

/**
 * Ask the main process for the device information.
 */
const getDeviceInfo = (): Promise<DeviceInfo> => {
  return ipcRenderer.callMain(IpcRequest.GetDeviceInfo) as Promise<DeviceInfo>
}

export default getDeviceInfo

import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"

const updateOs = (
  updateFilePath: string
): Promise<DeviceResponse> | DeviceResponse => {
  return ipcRenderer.callMain(IpcRequest.UpdateOs, updateFilePath)
}

export default updateOs

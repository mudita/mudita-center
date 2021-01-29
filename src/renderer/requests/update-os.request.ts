import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"

const updateOs = (
  fileName: string,
  progressChannel: string
): Promise<DeviceResponse> => {
  return ipcRenderer.callMain(IpcRequest.UpdateOs, {
    fileName,
    progressChannel,
  })
}

export default updateOs

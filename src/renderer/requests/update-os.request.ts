import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"
import path from "path"
import { getAppSettings } from "Renderer/requests/app-settings.request"

const updateOs = async (
  fileName: string,
  progressChannel: string
): Promise<DeviceResponse> => {
  const { pureOsDownloadLocation } = await getAppSettings()
  const filePath = path.join(pureOsDownloadLocation, fileName)
  return ipcRenderer.callMain(IpcRequest.UpdateOs, {
    filePath,
    progressChannel,
  })
}

export default updateOs

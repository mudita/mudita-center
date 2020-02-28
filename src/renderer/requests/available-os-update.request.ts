import { ipcRenderer } from "electron-better-ipc"
import { OsUpdateChannel } from "App/main/functions/register-pure-os-update-listener"

export interface UpdateStatusResponse {
  available: boolean
  version?: string
  file?: string
}

const updateStatus: UpdateStatusResponse = {
  available: false,
  version: undefined,
  file: undefined,
}

const availableOsUpdateRequest = (
  lastUpdate: string
): Promise<UpdateStatusResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { date, version, file } = await ipcRenderer.callMain(
        OsUpdateChannel.Request
      )
      if (new Date(date) > new Date(lastUpdate)) {
        updateStatus.available = true
        updateStatus.version = version
        updateStatus.file = file
      }
      resolve(updateStatus)
    } catch (error) {
      reject(error)
    }
  })
}

export default availableOsUpdateRequest

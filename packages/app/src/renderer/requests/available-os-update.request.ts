import { ipcRenderer } from "electron-better-ipc"
import { OsUpdateChannel } from "App/main/functions/register-pure-os-update-listener"

export interface UpdateStatusResponse {
  available: boolean
  version: string
  file: string
  date: string
  size: number
}

const availableOsUpdateRequest = (
  lastUpdate: string
): Promise<UpdateStatusResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { date, ...rest } = await ipcRenderer.callMain<
        string,
        Omit<UpdateStatusResponse, "available">
      >(OsUpdateChannel.Request)
      resolve({
        available: new Date(date) > new Date(lastUpdate),
        date,
        ...rest,
      })
    } catch (error) {
      reject(error)
    }
  })
}

export default availableOsUpdateRequest

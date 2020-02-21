import { ipcRenderer } from "electron-better-ipc"

interface UpdateStatusResponse {
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
  return new Promise((resolve, reject) => {
    try {
      ipcRenderer.send("os-update-request")
      ipcRenderer.on("os-update-reply", (event, { date, file, version }) => {
        if (new Date(date) > new Date(lastUpdate)) {
          updateStatus.available = true
          updateStatus.version = version
          updateStatus.file = file
        }
        resolve(updateStatus)
      })
    } catch (error) {
      reject(error)
    }
  })
}

export default availableOsUpdateRequest

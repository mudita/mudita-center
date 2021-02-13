import BackupInfo from "Common/interfaces/backup-info"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"
import DeviceResponse from "Backend/adapters/device-response.interface"

const getBackupsInfo = (): Promise<DeviceResponse<BackupInfo>> =>
  ipcRenderer.callMain(IpcRequest.GetBackupsInfo)

export default getBackupsInfo

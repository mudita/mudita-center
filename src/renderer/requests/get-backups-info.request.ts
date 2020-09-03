import BackupInfo from "Common/interfaces/backup-info"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcRenderer } from "electron-better-ipc"

const getBackupsInfo = (): Promise<BackupInfo> =>
  ipcRenderer.callMain(IpcRequest.GetBackupsInfo)

export default getBackupsInfo

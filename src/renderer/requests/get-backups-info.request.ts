import BackupInfo from "Common/interfaces/backup-info"
import { ipcRenderer } from "electron-better-ipc"
import { PureBackupEvents } from "App/main/functions/register-pure-backup-listeners"

const getBackupsInfo = (): Promise<BackupInfo> =>
  ipcRenderer.callMain(PureBackupEvents.Get) as Promise<BackupInfo>

export default getBackupsInfo

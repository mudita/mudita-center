import BackupItemInfo from "Common/interfaces/backup-item-info.interface"

export default abstract class PurePhoneBackupAdapter {
  public abstract getBackups(): BackupItemInfo[]
}

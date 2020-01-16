import BackupItemInfo from "Common/interfaces/backup-item-info.interface"

export default interface BackupInfo {
  // List of backups.
  readonly backups: BackupItemInfo[]
}

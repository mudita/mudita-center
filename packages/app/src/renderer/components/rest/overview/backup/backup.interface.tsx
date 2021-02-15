import BackupItemInfo from "Common/interfaces/backup-item-info.interface"

export interface BackupProps {
  lastBackup?: BackupItemInfo
  onBackupCreate: () => void
  onBackupRestore?: () => void
}

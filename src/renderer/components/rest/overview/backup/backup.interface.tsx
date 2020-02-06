export interface BackupProps {
  lastBackup?: string
  onBackupCreate: () => void
  onBackupRestore?: () => void
}

export default interface BackupItemInfo {
  // Creation date. ISO date.
  readonly createdAt: string

  // Size of the backup in bytes.
  readonly size: number
}

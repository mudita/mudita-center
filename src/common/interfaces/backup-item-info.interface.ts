export default interface BackupItemInfo {
  // Creation date (ISO 8601, no fractional seconds).
  readonly createdAt: string

  // Size of the backup in bytes.
  readonly size: number
}

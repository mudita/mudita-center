/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum IpcRequest {
  GetDeviceInfo = "get-device-info",
  GetBatteryInfo = "get-battery-info",
  GetStorageInfo = "get-storage-info",
  GetNetworkInfo = "get-network-info",
  ConnectDevice = "connect-device",
  DisconnectDevice = "disconnect-device",
  UnlockDevice = "unlock-device",
  GetUnlockDeviceStatus = "get-unlock-device-status",
  ChangeSim = "change-sim",
  GetDeviceLogFiles = "get-device-log-files",
  GetDeviceCrashDumpFiles = "get-device-crash-dump-files",
  DownloadCrashDumpFiles = "download-crash-dump-files",
  ExportContacts = "export-contacts",
  ExportEvents = "export-events",
  GetEvents = "get-events",
  GetDeviceLockTime = "get-device-lock-time",
  UploadDeviceFileLocally = "upload-device-file-locally",
  StartBackupDevice = "start-backup-device",
  GetBackupDeviceStatus = "get-backup-device-status",
  StartRestoreDevice = "start-restore-device",
  GetRestoreDeviceStatus = "get-restore-device-status",
}

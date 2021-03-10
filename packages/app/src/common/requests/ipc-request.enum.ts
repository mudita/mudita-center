/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

export enum IpcRequest {
  GetDeviceInfo = "get-device-info",
  GetBatteryInfo = "get-battery-info",
  GetStorageInfo = "get-storage-info",
  GetNetworkInfo = "get-network-info",
  GetBackupsInfo = "get-backups-info",
  ConnectDevice = "connect-device",
  DisconnectDevice = "disconnect-device",
  ChangeSim = "change-sim",
  GetContacts = "get-contacts",
  AddContact = "add-contact",
  EditContact = "edit-contact",
  DeleteContacts = "delete-contacts",
  UpdateAppSettings = "update-app-settings",
  GetAppSettings = "get-app-settings",
  ResetAppSettings = "reset-app-settings",
  UpdateOs = "update-os",
  ExportContacts = "export-contacts",
  ExportEvents = "export-events",
  GetEvents = "get-events",
  GetMessagesByThreadId = "get-messages-by-thread-id",
  GetThreads = "get-threads",
}

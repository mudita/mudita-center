/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { MuditaDeviceManager } from "@mudita/pure"
import { createDeviceService } from "Backend/device-service"
import getFakeAdapters from "App/tests/get-fake-adapters"
import Backend from "Backend/backend"
import createElectronAppAdapter from "Backend/adapters/electron-app/electron-app.adapter"
import createAppSettingsAdapter from "Backend/adapters/app-settings/app-settings.adapter"
import createPurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone.adapter"
import createPhonebook from "Backend/adapters/phonebook/phonebook.adapter"
import createPurePhoneBatteryAdapter from "Backend/adapters/pure-phone-battery-service/pure-phone-battery-service.adapter"
import createPurePhoneNetwork from "Backend/adapters/pure-phone-network/pure-phone-network.adapter"
import createPurePhoneStorageAdapter from "Backend/adapters/pure-phone-storage/pure-phone-storage.adapter"
import createPurePhoneMessagesAdapter from "Backend/adapters/pure-phone-messages/pure-phone-messages.adapter"
import createCalendarAdapter from "Backend/adapters/calendar/calendar.adapter"
import createDeviceFileSystemAdapter from "Backend/adapters/device-file-system/device-file-system.adapter"
import { createDeviceFileDiagnosticService } from "Backend/device-file-diagnostic-service/device-file-diagnostic-service"
import registerBatteryInfoRequest from "Backend/requests/battery/get-battery-info.request"
import registerChangeSimCardRequest from "Backend/requests/change-sim/change-sim.request"
import registerDeviceInfoRequest from "Backend/requests/device-info/get-device-info.request"
import registerConnectDeviceRequest from "Backend/requests/connect-device/connect-device.request"
import registerDisconnectDeviceRequest from "Backend/requests/disconnect-device/disconnect-device.request"
import registerUnlockDeviceRequest from "Backend/requests/unlock-device/unlock-device.request"
import registerGetUnlockDeviceStatus from "Backend/requests/get-unlock-device-status/get-unlock-device-status.request"
import registerGetDeviceLockTime from "Backend/requests/get-device-lock-time/get-device-lock-time.request"
import registerNetworkInfoRequest from "Backend/requests/network/get-network-info.request"
import registerPurePhoneStorageRequest from "Backend/requests/storage/get-storage-info.request"
import registerGetContactsRequest from "Backend/requests/phonebook/get-contacts.request"
import registerAddContactRequest from "Backend/requests/phonebook/add-contact.request"
import registerEditContactRequest from "Backend/requests/phonebook/edit-contact.request"
import registerDeleteContactsRequest from "Backend/requests/phonebook/delete-contacts.request"
import registerAppSettingsRequest from "Backend/requests/app-settings/get-app-settings.request"
import registerAppSettingsUpdateRequest from "Backend/requests/app-settings/update-app-settings.request"
import registerAppSettingsResetRequest from "Backend/requests/app-settings/reset-app-settings.request"
import registerUpdateOsRequest from "Backend/requests/update-os/update-os.request"
import registerGetEventsRequest from "Backend/requests/calendar/get-events.request"
import registerGetThreadsRequest from "Backend/requests/messages/get-threads.request"
import registerGetMessagesByThreadIdRequest from "Backend/requests/messages/get-messages-by-thread-id.request"
import registerAddMessageRequest from "Backend/requests/messages/add-message.request"
import registerGetDeviceLogFiles from "Backend/requests/get-device-log-files/get-device-log-files.request"
import registerGetDeviceCrashDumpFiles from "Backend/requests/get-device-crash-dump-files/get-device-log-files.request"
import registerDownloadDeviceFilesRequest from "App/device-file-system/listeners/download-device-file.listener"
import registerUploadDeviceFileRequest from "App/device-file-system/listeners/upload-device-file.listener"
import registerUploadDeviceFileLocallyRequest from "App/device-file-system/listeners/upload-device-file-locally.listener"
import registerStartBackupDeviceRequest from "Backend/requests/start-backup-device/start-backup-device.request"
import registerGetBackupDeviceStatusRequest from "Backend/requests/get-backup-device-status/get-backup-device-status.request"
import registerStartRestoreDeviceRequest from "Backend/requests/start-restore-device/start-restore-device.request"
import registerGetRestoreDeviceStatusRequest from "Backend/requests/get-restore-device-status/get-restore-device-status.request"
import registerDownloadDeviceCrashDumpFiles from "App/backend/requests/download-crash-dump-files/download-crash-dump-files.request"
import { registerFileSystemRemoveRequest } from "App/device-file-system"

const bootstrap = (
  deviceManager: MuditaDeviceManager,
  ipcMain: MainProcessIpc
): void => {
  const deviceService = createDeviceService(deviceManager, ipcMain)
  const deviceFileSystem = createDeviceFileSystemAdapter(deviceService)
  const deviceFileDiagnosticService =
    createDeviceFileDiagnosticService(deviceService)

  const adapters = {
    deviceFileSystem,
    purePhone: createPurePhoneAdapter(
      deviceService,
      deviceFileSystem,
      deviceFileDiagnosticService
    ),
    phonebook: createPhonebook(deviceService),
    pureBatteryService: createPurePhoneBatteryAdapter(deviceService),
    pureNetwork: createPurePhoneNetwork(deviceService),
    pureStorage: createPurePhoneStorageAdapter(deviceService),
    appSettings: createAppSettingsAdapter(),
    calendar: createCalendarAdapter(),
    pureMessages: createPurePhoneMessagesAdapter(deviceService),
    app: createElectronAppAdapter(),
  }

  const requests = [
    registerDeviceInfoRequest,
    registerNetworkInfoRequest,
    registerPurePhoneStorageRequest,
    registerBatteryInfoRequest,
    registerConnectDeviceRequest,
    registerDisconnectDeviceRequest,
    registerUnlockDeviceRequest,
    registerGetUnlockDeviceStatus,
    registerGetDeviceLockTime,
    registerChangeSimCardRequest,
    registerGetContactsRequest,
    registerAddContactRequest,
    registerEditContactRequest,
    registerDeleteContactsRequest,
    registerAppSettingsRequest,
    registerAppSettingsUpdateRequest,
    registerAppSettingsResetRequest,
    registerUpdateOsRequest,
    registerGetEventsRequest,
    registerGetThreadsRequest,
    registerGetMessagesByThreadIdRequest,
    registerAddMessageRequest,
    registerGetDeviceLogFiles,
    registerGetDeviceCrashDumpFiles,
    registerDownloadDeviceFilesRequest,
    registerUploadDeviceFileLocallyRequest,
    registerUploadDeviceFileRequest,
    registerStartBackupDeviceRequest,
    registerGetBackupDeviceStatusRequest,
    registerStartRestoreDeviceRequest,
    registerGetRestoreDeviceStatusRequest,
    registerDownloadDeviceCrashDumpFiles,
    registerFileSystemRemoveRequest,
  ]

  new Backend(adapters, getFakeAdapters(), requests).init()
}

export default bootstrap

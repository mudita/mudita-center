/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MuditaDeviceManager } from "@mudita/pure"
import { MainProcessIpc } from "electron-better-ipc"
import Backend from "Backend/backend"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { createDeviceService } from "Backend/device-service"
import createDeviceBackupService from "./device-backup-service/device-backup-service"
import createElectronAppAdapter from "Backend/adapters/electron-app/electron-app.adapter"
import createPurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone.adapter"
import createPurePhoneBatteryAdapter from "Backend/adapters/pure-phone-battery-service/pure-phone-battery-service.adapter"
import createPurePhoneNetwork from "Backend/adapters/pure-phone-network/pure-phone-network.adapter"
import createPurePhoneStorageAdapter from "Backend/adapters/pure-phone-storage/pure-phone-storage.adapter"
import createPurePhoneMessagesAdapter from "Backend/adapters/pure-phone-messages/pure-phone-messages.adapter"
import createCalendarAdapter from "Backend/adapters/calendar/calendar.adapter"
import createDeviceFileSystemAdapter from "Backend/adapters/device-file-system/device-file-system.adapter"
import createDeviceBackupAdapter from "Backend/adapters/device-backup/device-backup.adapter"
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
import registerStartRestoreDeviceRequest from "Backend/requests/start-restore-device/start-restore-device.request"
import registerGetRestoreDeviceStatusRequest from "Backend/requests/get-restore-device-status/get-restore-device-status.request"
import registerDownloadDeviceCrashDumpFiles from "App/backend/requests/download-crash-dump-files/download-crash-dump-files.request"
import { registerFileSystemRemoveRequest } from "App/device-file-system"
import { registerDownloadDeviceBackupRequest } from "App/backup-device"
import createDeviceBaseInfoAdapter from "Backend/adapters/device-base-info/device-base-info.adapter"

import { ApplicationModule } from "App/core/application.module"

const bootstrap = (
  deviceManager: MuditaDeviceManager,
  ipcMain: MainProcessIpc
): void => {
  const deviceService = createDeviceService(deviceManager, ipcMain)
  const deviceBaseInfo = createDeviceBaseInfoAdapter(deviceService)
  const deviceFileDiagnosticService =
    createDeviceFileDiagnosticService(deviceService)
  const deviceFileSystem = createDeviceFileSystemAdapter(deviceService)
  const purePhone = createPurePhoneAdapter(
    deviceService,
    deviceBaseInfo,
    deviceFileSystem,
    deviceFileDiagnosticService
  )
  const deviceBackupService = createDeviceBackupService(deviceService)
  const deviceBackup = createDeviceBackupAdapter(
    deviceBaseInfo,
    deviceBackupService,
    deviceFileSystem
  )

  const adapters = {
    deviceBackup,
    deviceFileSystem,
    purePhone,
    deviceBaseInfo,
    pureBatteryService: createPurePhoneBatteryAdapter(deviceService),
    pureNetwork: createPurePhoneNetwork(deviceService),
    pureStorage: createPurePhoneStorageAdapter(deviceService),
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
    registerStartRestoreDeviceRequest,
    registerGetRestoreDeviceStatusRequest,
    registerDownloadDeviceCrashDumpFiles,
    registerFileSystemRemoveRequest,
    registerDownloadDeviceBackupRequest,
  ]

  new ApplicationModule(deviceService)
  new Backend(adapters, getFakeAdapters(), requests).init()
}

export default bootstrap

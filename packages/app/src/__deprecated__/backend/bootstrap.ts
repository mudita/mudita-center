/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import Backend from "App/__deprecated__/backend/backend"
import getFakeAdapters from "App/__deprecated__/tests/get-fake-adapters"
import { createDeviceService } from "App/__deprecated__/backend/device-service"
import createDeviceBackupService from "./device-backup-service/device-backup-service"
import createElectronAppAdapter from "App/__deprecated__/backend/adapters/electron-app/electron-app.adapter"
import createPurePhoneAdapter from "App/__deprecated__/backend/adapters/pure-phone/pure-phone.adapter"
import createPurePhoneBatteryAdapter from "App/__deprecated__/backend/adapters/pure-phone-battery-service/pure-phone-battery-service.adapter"
import createPurePhoneNetwork from "App/__deprecated__/backend/adapters/pure-phone-network/pure-phone-network.adapter"
import createPurePhoneStorageAdapter from "App/__deprecated__/backend/adapters/pure-phone-storage/pure-phone-storage.adapter"
import createCalendarAdapter from "App/__deprecated__/backend/adapters/calendar/calendar.adapter"
import createDeviceFileSystemAdapter from "App/__deprecated__/backend/adapters/device-file-system/device-file-system.adapter"
import createDeviceBackupAdapter from "App/__deprecated__/backend/adapters/device-backup/device-backup.adapter"
import { createDeviceFileDiagnosticService } from "App/__deprecated__/backend/device-file-diagnostic-service/device-file-diagnostic-service"
import registerBatteryInfoRequest from "App/__deprecated__/backend/requests/battery/get-battery-info.request"
import registerChangeSimCardRequest from "App/__deprecated__/backend/requests/change-sim/change-sim.request"
import registerDeviceInfoRequest from "App/__deprecated__/backend/requests/device-info/get-device-info.request"
import registerConnectDeviceRequest from "App/__deprecated__/backend/requests/connect-device/connect-device.request"
import registerDisconnectDeviceRequest from "App/__deprecated__/backend/requests/disconnect-device/disconnect-device.request"
import registerUnlockDeviceRequest from "App/__deprecated__/backend/requests/unlock-device/unlock-device.request"
import registerGetUnlockDeviceStatus from "App/__deprecated__/backend/requests/get-unlock-device-status/get-unlock-device-status.request"
import registerGetDeviceLockTime from "App/__deprecated__/backend/requests/get-device-lock-time/get-device-lock-time.request"
import registerNetworkInfoRequest from "App/__deprecated__/backend/requests/network/get-network-info.request"
import registerPurePhoneStorageRequest from "App/__deprecated__/backend/requests/storage/get-storage-info.request"
import registerUpdateOsRequest from "App/__deprecated__/backend/requests/update-os/update-os.request"
import registerGetEventsRequest from "App/__deprecated__/backend/requests/calendar/get-events.request"
import registerGetDeviceLogFiles from "App/__deprecated__/backend/requests/get-device-log-files/get-device-log-files.request"
import registerGetDeviceCrashDumpFiles from "App/__deprecated__/backend/requests/get-device-crash-dump-files/get-device-log-files.request"
import registerDownloadDeviceFilesRequest from "App/device-file-system/listeners/download-device-file.listener"
import registerUploadDeviceFileRequest from "App/device-file-system/listeners/upload-device-file.listener"
import registerUploadDeviceFileLocallyRequest from "App/device-file-system/listeners/upload-device-file-locally.listener"
import registerGetRestoreDeviceStatusRequest from "App/__deprecated__/backend/requests/get-restore-device-status/get-restore-device-status.request"
import registerDownloadDeviceCrashDumpFiles from "App/__deprecated__/backend/requests/download-crash-dump-files/download-crash-dump-files.request"
import { registerFileSystemRemoveRequest } from "App/device-file-system"
import createDeviceBaseInfoAdapter from "App/__deprecated__/backend/adapters/device-base-info/device-base-info.adapter"

import {
  DeviceManager,
  UsbDetector,
  DeviceResolverService,
} from "App/device/services"
import { ApplicationModule } from "App/core/application.module"

const bootstrap = (ipcMain: MainProcessIpc): void => {
  const deviceManager = new DeviceManager(
    new UsbDetector(),
    new DeviceResolverService()
  )

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
    registerGetDeviceLogFiles,
    registerGetDeviceCrashDumpFiles,
    registerDownloadDeviceFilesRequest,
    registerUploadDeviceFileLocallyRequest,
    registerUploadDeviceFileRequest,
    registerGetRestoreDeviceStatusRequest,
    registerDownloadDeviceCrashDumpFiles,
    registerFileSystemRemoveRequest,
  ]

  new ApplicationModule(deviceService)
  new Backend(adapters, getFakeAdapters(), requests).init()
}

export default bootstrap

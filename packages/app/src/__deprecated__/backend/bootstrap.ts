/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import Backend from "App/__deprecated__/backend/backend"
import { flags, Feature } from "App/feature-flags"
import getFakeAdapters from "App/__deprecated__/tests/get-fake-adapters"
import { createDeviceService } from "App/__deprecated__/backend/device-service"
import createElectronAppAdapter from "App/__deprecated__/backend/adapters/electron-app/electron-app.adapter"
import createPurePhoneAdapter from "App/__deprecated__/backend/adapters/pure-phone/pure-phone.adapter"
import createDeviceFileSystemAdapter from "App/__deprecated__/backend/adapters/device-file-system/device-file-system.adapter"
import { createDeviceFileDiagnosticService } from "App/__deprecated__/backend/device-file-diagnostic-service/device-file-diagnostic-service"
import registerConnectDeviceRequest from "App/__deprecated__/backend/requests/connect-device/connect-device.request"
import registerDisconnectDeviceRequest from "App/__deprecated__/backend/requests/disconnect-device/disconnect-device.request"
import registerUnlockDeviceRequest from "App/__deprecated__/backend/requests/unlock-device/unlock-device.request"
import registerGetUnlockDeviceStatus from "App/__deprecated__/backend/requests/get-unlock-device-status/get-unlock-device-status.request"
import registerGetDeviceLockTime from "App/__deprecated__/backend/requests/get-device-lock-time/get-device-lock-time.request"
import registerUpdateOsRequest from "App/__deprecated__/backend/requests/update-os/update-os.request"
import registerGetDeviceLogFiles from "App/__deprecated__/backend/requests/get-device-log-files/get-device-log-files.request"
import registerGetDeviceCrashDumpFiles from "App/__deprecated__/backend/requests/get-device-crash-dump-files/get-device-log-files.request"
import registerDownloadDeviceFilesRequest from "App/device-file-system/listeners/download-device-file.listener"
import registerUploadDeviceFileRequest from "App/device-file-system/listeners/upload-device-file.listener"
import registerUploadDeviceFileLocallyRequest from "App/device-file-system/listeners/upload-device-file-locally.listener"
import registerGetRestoreDeviceStatusRequest from "App/__deprecated__/backend/requests/get-restore-device-status/get-restore-device-status.request"
import registerDownloadDeviceCrashDumpFiles from "App/__deprecated__/backend/requests/download-crash-dump-files/download-crash-dump-files.request"
import { registerFileSystemRemoveRequest } from "App/device-file-system"
import createDeviceBaseInfoAdapter from "App/__deprecated__/backend/adapters/device-base-info/device-base-info.adapter"
import PureLogger from "App/__deprecated__/main/utils/pure-logger"
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

  const enabled =
    process.env.NODE_ENV === "development" &&
    process.env.DISABLE_DEV_DEVICE_LOGGER === "1"
      ? false
      : flags.get(Feature.LoggerEnabled)

  deviceManager.registerLogger(new PureLogger())
  deviceManager.toggleLogs(enabled)

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

  const adapters = {
    deviceFileSystem,
    purePhone,
    app: createElectronAppAdapter(),
  }

  const requests = [
    registerConnectDeviceRequest,
    registerDisconnectDeviceRequest,
    registerUnlockDeviceRequest,
    registerGetUnlockDeviceStatus,
    registerGetDeviceLockTime,
    registerUpdateOsRequest,
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

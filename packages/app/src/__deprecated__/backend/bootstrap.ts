/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import Backend from "App/__deprecated__/backend/backend"
import { flags, Feature } from "App/feature-flags"
import getFakeAdapters from "App/__deprecated__/tests/get-fake-adapters"
import { createDeviceService } from "App/__deprecated__/backend/device-service"
import createPurePhoneAdapter from "App/__deprecated__/backend/adapters/pure-phone/pure-phone.adapter"
import registerConnectDeviceRequest from "App/__deprecated__/backend/requests/connect-device/connect-device.request"
import registerDisconnectDeviceRequest from "App/__deprecated__/backend/requests/disconnect-device/disconnect-device.request"
import registerUnlockDeviceRequest from "App/__deprecated__/backend/requests/unlock-device/unlock-device.request"
import registerGetUnlockDeviceStatus from "App/__deprecated__/backend/requests/get-unlock-device-status/get-unlock-device-status.request"
import registerGetDeviceLockTime from "App/__deprecated__/backend/requests/get-device-lock-time/get-device-lock-time.request"
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
  const purePhone = createPurePhoneAdapter(deviceService)

  const adapters = {
    purePhone,
  }

  const requests = [
    registerConnectDeviceRequest,
    registerDisconnectDeviceRequest,
    registerUnlockDeviceRequest,
    registerGetUnlockDeviceStatus,
    registerGetDeviceLockTime,
  ]

  new ApplicationModule(deviceService)
  new Backend(adapters, getFakeAdapters(), requests).init()
}

export default bootstrap

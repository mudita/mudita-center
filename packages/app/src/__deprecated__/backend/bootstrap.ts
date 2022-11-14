/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "reflect-metadata"
import { MainProcessIpc } from "electron-better-ipc"
import { flags, Feature } from "App/feature-flags"
import { createDeviceService } from "App/__deprecated__/backend/device-service"
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

  new ApplicationModule(deviceService)
}

export default bootstrap

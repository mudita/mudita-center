/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { MetadataStore } from "Core/metadata/services"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"
import { AppLogger } from "Core/__deprecated__/main/utils/logger"
import { IndexStorage } from "Core/index-storage/types"
import { BaseModule } from "Core/core/module"
import { DeviceManager } from "Core/device-manager/services"
import { UsbDeviceDetectionObserver } from "Core/device-manager/observers"
import { DeviceManagerController } from "Core/device-manager/controllers"
import { DeviceCacheConfigurationService } from "Core/device-manager/services/device-cache-configuration.service"

export class DeviceManagerModule extends BaseModule {
  constructor(
    public index: IndexStorage,
    public deviceManager: DeviceManager,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService
  ) {
    super(
      index,
      deviceManager,
      keyStorage,
      logger,
      ipc,
      eventEmitter,
      fileSystem
    )

    const usbDeviceDetectionObserver = new UsbDeviceDetectionObserver(
      this.deviceManager
    )

    const deviceManagerController = new DeviceManagerController(
      this.deviceManager,
      new DeviceCacheConfigurationService(this.fileSystem)
    )

    this.initializers = []
    this.observers = [usbDeviceDetectionObserver]
    this.controllers = [deviceManagerController]
  }
}

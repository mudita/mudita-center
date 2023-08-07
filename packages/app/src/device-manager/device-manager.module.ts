/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { MetadataStore } from "App/metadata/services"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { AppLogger } from "App/__deprecated__/main/utils/logger"
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import { DeviceManager } from "App/device-manager/services"
import {
  UsbDeviceAttachObserver,
  DeviceDisconnectedObserver,
} from "App/device-manager/observers"
import { DeviceManagerController } from "App/device-manager/controllers"
import { DeviceInitializationFailedObserver } from "App/device-manager/observers/device-initialization-failed.observer"

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

    const usbDeviceAttachObserver = new UsbDeviceAttachObserver(
      this.deviceManager
    )
    const deviceDisconnectedObserver = new DeviceDisconnectedObserver(
      this.deviceManager,
      this.eventEmitter
    )
    const deviceInitializationFailedObserver =
      new DeviceInitializationFailedObserver(
        this.deviceManager,
        this.eventEmitter
      )

    const deviceManagerController = new DeviceManagerController(
      this.deviceManager
    )

    this.initializers = []
    this.observers = [
      usbDeviceAttachObserver,
      deviceDisconnectedObserver,
      deviceInitializationFailedObserver,
    ]
    this.controllers = [deviceManagerController]
  }
}

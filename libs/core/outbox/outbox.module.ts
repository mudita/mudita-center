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
import { OutboxFactory } from "Core/outbox/factories"
import { DeviceManager } from "Core/device-manager/services"
import { IndexStorageController } from "Core/outbox/controllers"

export class OutboxModule extends BaseModule {
  constructor(
    public index: IndexStorage,
    public deviceModule: DeviceManager,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService
  ) {
    super(
      index,
      deviceModule,
      keyStorage,
      logger,
      ipc,
      eventEmitter,
      fileSystem
    )

    const outboxService = OutboxFactory.create(
      this.index,
      this.eventEmitter,
      this.deviceModule
    )

    const indexStorageController = new IndexStorageController(outboxService)

    this.controllers = [indexStorageController]
  }
}

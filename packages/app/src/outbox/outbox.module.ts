/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { DeviceService } from "App/backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { AppLogger } from "App/main/utils/logger"
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import { OutboxService } from "App/outbox/services"
import { OutboxObserver } from "App/outbox/observers/outbox.observer"
import { ContactRepository } from "App/contacts/repositories"

export class OutboxModule extends BaseModule {
  constructor(
    public index: IndexStorage,
    public deviceService: DeviceService,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService
  ) {
    super(
      index,
      deviceService,
      keyStorage,
      logger,
      ipc,
      eventEmitter,
      fileSystem
    )
    const contactRepository = new ContactRepository()

    const outboxService = new OutboxService(
      this.deviceService,
      contactRepository
    )
    const outboxObserver = new OutboxObserver(
      this.ipc,
      this.deviceService,
      outboxService
    )

    this.controllers = []

    this.observers = [outboxObserver]
  }
}

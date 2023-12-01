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
import { ContactModel } from "App/contacts/models"
import { ContactController } from "App/contacts/controllers"
import { ContactService } from "App/contacts/services"
import { ContactRepository } from "App/contacts/repositories"
import { DeviceManager } from "App/device-manager/services"

export class ContactModule extends BaseModule {
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
    const contactModel = new ContactModel(this.index, this.eventEmitter)
    const contactRepository = new ContactRepository(contactModel)
    const contactService = new ContactService(
      contactRepository,
      this.deviceManager
    )
    const contactController = new ContactController(contactService)

    this.models = [contactModel]
    this.controllers = [contactController]
  }
}

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
import { TemplateModel } from "Core/templates/models"
import { TemplateRepository } from "Core/templates/repositories"
import { TemplateService } from "Core/templates/services"
import { TemplateController } from "Core/templates/controllers"
import { DeviceProtocolService } from "device-protocol/feature"

export class TemplateModule extends BaseModule {
  constructor(
    public index: IndexStorage,
    public deviceProtocolService: DeviceProtocolService,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService
  ) {
    super(
      index,
      deviceProtocolService,
      keyStorage,
      logger,
      ipc,
      eventEmitter,
      fileSystem
    )
    const templateModel = new TemplateModel(this.index, this.eventEmitter)
    const templateRepository = new TemplateRepository(templateModel)
    const templateService = new TemplateService(
      this.deviceProtocolService,
      templateRepository
    )
    const templateController = new TemplateController(templateService)

    this.models = [templateModel]
    this.controllers = [templateController]
  }
}

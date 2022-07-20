/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { DeviceService } from "App/__deprecated__/backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { AppLogger } from "App/__deprecated__/main/utils/logger"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import { MessageModel, ThreadModel } from "App/messages/models"
import { MessageService, ThreadService } from "App/messages/services"
import { MessageController, ThreadController } from "App/messages/controllers"
import { MessageRepository, ThreadRepository } from "App/messages/repositories"

export class MessageModule extends BaseModule {
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

    const messageModel = new MessageModel(this.index, this.eventEmitter)
    const threadModel = new ThreadModel(this.index, this.eventEmitter)
    const threadRepository = new ThreadRepository(threadModel)
    const messageRepository = new MessageRepository(messageModel)
    const threadService = new ThreadService(
      this.deviceService,
      threadRepository
    )
    const messageService = new MessageService(
      this.deviceService,
      threadService,
      messageRepository
    )
    const messageController = new MessageController(messageService)
    const threadController = new ThreadController(threadService)

    this.models = [messageModel, threadModel]
    this.controllers = [messageController, threadController]
  }
}

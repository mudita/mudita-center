/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { DeviceService } from "App/backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { AppLogger } from "App/main/utils/logger"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import { MessageModel, ThreadModel } from "App/messages/models"
import { MessageService } from "App/messages/services"
import { MessageController } from "App/messages/controllers"
import { ThreadController } from "App/messages/controllers/thread.controller"
import { MessageObserver } from "App/messages/observers/message.observer"
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
    const messageService = new MessageService(this.deviceService)
    const messageController = new MessageController(messageService)
    const threadController = new ThreadController(messageService)
    const messageRepository = new MessageRepository(messageModel)
    const threadRepository = new ThreadRepository(threadModel)
    const messageObserver = new MessageObserver(
      this.ipc,
      this.deviceService,
      messageService,
      messageRepository,
      threadRepository
    )
    this.models = [messageModel, threadModel]
    this.controllers = [messageController, threadController]
    this.observers = [messageObserver]
  }
}

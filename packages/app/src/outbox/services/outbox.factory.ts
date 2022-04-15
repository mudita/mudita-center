/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import { OutboxEntryType } from "@mudita/pure"
import { DeviceService } from "Backend/device-service"
import { IndexStorage } from "App/index-storage/types"
import {
  EntryHandlersMapType,
  OutboxService,
} from "App/outbox/services/outbox.service"
import { ContactModel } from "App/contacts/models"
import { ContactRepository } from "App/contacts/repositories"
import { ContactService } from "App/contacts/services"
import { ContactEntryHandlerService } from "App/outbox/services/contact-entry-handler.service"
import { MessageService, ThreadService } from "App/messages/services"
import { MessageRepository, ThreadRepository } from "App/messages/repositories"
import { MessageModel, ThreadModel } from "App/messages/models"
import { MessageEntryHandlerService } from "App/outbox/services/message-entry-handler.service"
import { ThreadEntryHandlerService } from "App/outbox/services/thread-entry-handler.service"

export class OutboxFactory {
  static create(
    index: IndexStorage,
    eventEmitter: EventEmitter,
    deviceService: DeviceService
  ): OutboxService {
    const contactModel = new ContactModel(index, eventEmitter)
    const contactRepository = new ContactRepository(contactModel)
    const contactService = new ContactService(contactRepository, deviceService)
    const contactEntryHandlerService = new ContactEntryHandlerService(
      contactService,
      contactRepository
    )

    const messageModel = new MessageModel(index, eventEmitter)
    const messageRepository = new MessageRepository(messageModel)
    const threadService = new ThreadService(deviceService)
    const messageService = new MessageService(deviceService, threadService)

    const threadModel = new ThreadModel(index, eventEmitter)
    const threadRepository = new ThreadRepository(threadModel)
    const threadEntryHandlerService = new ThreadEntryHandlerService(
      threadService,
      threadRepository
    )

    const messageEntryHandlerService = new MessageEntryHandlerService(
      messageService,
      messageRepository,
      threadEntryHandlerService
    )

    const entryHandlersMap: EntryHandlersMapType = {
      [OutboxEntryType.Contact]: contactEntryHandlerService,
      [OutboxEntryType.Message]: messageEntryHandlerService,
      [OutboxEntryType.Thread]: threadEntryHandlerService,
    }

    return new OutboxService(deviceService, entryHandlersMap)
  }
}

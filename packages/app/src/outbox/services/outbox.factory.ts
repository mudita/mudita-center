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

    // @ts-ignore
    const entryHandlersMap: EntryHandlersMapType = {
      [OutboxEntryType.Contact]: contactEntryHandlerService,
    }

    return new OutboxService(deviceService, entryHandlersMap)
  }
}

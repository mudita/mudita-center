/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OutboxEntry, OutboxEntryChange } from "@mudita/pure"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { ContactService } from "App/contacts/services"
import { ContactRepository } from "App/contacts/repositories"
import { EntryHandler } from "App/outbox/services/entry-handler.type"

export class ContactEntryHandlerService implements EntryHandler {
  constructor(
    private contactService: ContactService,
    private contactRepository: ContactRepository
  ) {}

  public  handleEntry = async (entry: OutboxEntry): Promise<void>  =>{
    const id = String(entry.record_id)

    if (entry.change === OutboxEntryChange.Deleted) {
      return this.contactRepository.delete(id)
    }

    const { status, data } = await this.contactService.getContact(id)

    if (status !== RequestResponseStatus.Ok || data === undefined) {
      return
    }

    if (entry.change === OutboxEntryChange.Created) {
      return this.contactRepository.create(data)
    }

    if (entry.change === OutboxEntryChange.Updated) {
      return this.contactRepository.update(data)
    }
  }
}

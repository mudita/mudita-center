/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessageRepository } from "App/messages/repositories"
import { OutboxEntry, OutboxEntryChange } from "@mudita/pure"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { EntryHandler } from "App/outbox/services/entry-handler.type"
import { MessageService } from "App/messages/services"

export class MessageEntryHandlerService implements EntryHandler {
  constructor(
    public messageService: MessageService,
    private messageRepository: MessageRepository,
  ) {}

  public async handleEntry(entry: OutboxEntry): Promise<void> {
    const id = String(entry.record_id)

    if (entry.change === OutboxEntryChange.Deleted) {
      return this.messageRepository.delete(id)
    }

    const { status, data } = await this.messageService.getMessage(id)

    if (status !== RequestResponseStatus.Ok || data === undefined) {
      return
    }

    if (entry.change === OutboxEntryChange.Created) {
      return this.messageRepository.create(data)
    }

    if (entry.change === OutboxEntryChange.Updated) {
      return this.messageRepository.update(data)
    }
  }
}

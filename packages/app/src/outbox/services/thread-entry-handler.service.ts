/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ThreadRepository } from "App/messages/repositories"
import { OutboxEntry, OutboxEntryChange } from "@mudita/pure"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { EntryHandler } from "App/outbox/services/entry-handler.type"
import { MessageService } from "App/messages/services"

export class ThreadEntryHandlerService implements EntryHandler {
  constructor(
    public messageService: MessageService,
    private threadRepository: ThreadRepository
  ) {}

  public async handleEntry(entry: OutboxEntry): Promise<void> {
    const id = String(entry.record_id)

    if (entry.change === OutboxEntryChange.Deleted) {
      return this.threadRepository.delete(id)
    }

    const { status, data } = await this.messageService.getThread(id)

    if (status !== RequestResponseStatus.Ok || data === undefined) {
      return
    }

    if (entry.change === OutboxEntryChange.Created) {
      return this.threadRepository.create(data)
    }

    if (entry.change === OutboxEntryChange.Updated) {
      return this.threadRepository.update(data)
    }
  }
}

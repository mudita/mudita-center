/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessageRepository } from "App/messages/repositories"
import { OutboxEntry, OutboxEntryChange, OutboxEntryType } from "@mudita/pure"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { EntryHandler } from "App/outbox/services/entry-handler.type"
import { MessageService } from "App/messages/services"
import { ThreadEntryHandlerService } from "App/outbox/services/thread-entry-handler.service"
import { Message } from "App/messages/dto"

export class MessageEntryHandlerService implements EntryHandler<Message> {
  constructor(
    public messageService: MessageService,
    private messageRepository: MessageRepository,
    private threadEntryHandlerService: ThreadEntryHandlerService
  ) {}

  public handleEntry = async (
    entry: OutboxEntry
  ): Promise<Message | undefined> => {
    const id = String(entry.record_id)

    if (entry.change === OutboxEntryChange.Deleted) {
      this.messageRepository.delete(id)
    }

    const { status, data } = await this.messageService.getMessage(id)

    if (status !== RequestResponseStatus.Ok || data === undefined) {
      return
    }

    await this.threadEntryHandlerService.handleEntry({
      uid: 0,
      type: OutboxEntryType.Thread,
      change: OutboxEntryChange.Relation,
      record_id: Number(data.threadId),
    })

    if (entry.change === OutboxEntryChange.Created) {
      return this.messageRepository.create(data)
    }

    if (entry.change === OutboxEntryChange.Updated) {
      return this.messageRepository.update(data)
    }

    return
  }
}

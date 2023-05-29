/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessageRepository, ThreadRepository } from "App/messages/repositories"
import { OutboxEntry } from "App/device/types/mudita-os"
import { OutboxEntryChange, OutboxEntryType } from "App/device/constants"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { EntryHandler } from "App/outbox/services/entry-handler.type"
import { MessageService } from "App/messages/services"
import { ThreadEntryHandlerService } from "App/outbox/services/thread-entry-handler.service"
import { Message } from "App/messages/dto"

export class MessageEntryHandlerService implements EntryHandler<Message> {
  constructor(
    public messageService: MessageService,
    private messageRepository: MessageRepository,
    private threadRepository: ThreadRepository,
    private threadEntryHandlerService: ThreadEntryHandlerService
  ) {}

  public handleEntry = async (
    entry: OutboxEntry
  ): Promise<Message | undefined> => {
    const id = String(entry.record_id)

    const { status, data } = await this.messageService.getMessage(id)

    const threadId = data
      ? data.threadId
      : this.messageRepository.findById(id)?.threadId

    if (entry.change === OutboxEntryChange.Deleted) {
      this.messageRepository.delete(id)
    }

    if (threadId === undefined) {
      return
    }

    const threadData = this.threadRepository.findById(threadId)

    await this.threadEntryHandlerService.handleEntry({
      uid: 0,
      type: OutboxEntryType.Thread,
      change: OutboxEntryChange.Relation,
      record_id: Number(threadId),
    })

    if (status !== RequestResponseStatus.Ok || data === undefined) {
      return
    }

    const messageObject: Message = {
      ...data,
      phoneNumberId: threadData ? threadData.phoneNumberId : "",
    }

    if (entry.change === OutboxEntryChange.Created) {
      return this.messageRepository.create(messageObject)
    }

    if (entry.change === OutboxEntryChange.Updated) {
      return this.messageRepository.update(messageObject)
    }

    return
  }
}

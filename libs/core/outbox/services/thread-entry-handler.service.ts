/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ThreadRepository } from "Core/messages/repositories"
import { OutboxEntry } from "Core/device/types/mudita-os"
import { OutboxEntryChange } from "Core/device/constants"
import { isResponseSuccessWithData } from "Core/core/helpers"
import { EntryHandler } from "Core/outbox/services/entry-handler.type"
import { ThreadService } from "Core/messages/services"
import { Thread } from "Core/messages/dto"

export class ThreadEntryHandlerService implements EntryHandler<Thread> {
  constructor(
    public threadService: ThreadService,
    private threadRepository: ThreadRepository
  ) {}

  public handleEntry = async (
    entry: OutboxEntry
  ): Promise<Thread | undefined> => {
    const id = String(entry.record_id)

    if (entry.change === OutboxEntryChange.Deleted) {
      this.threadRepository.delete(id)
      return
    }

    const response = await this.threadService.getThread(id)

    if (entry.change === OutboxEntryChange.Relation) {
      if (
        entry.change === OutboxEntryChange.Relation &&
        isResponseSuccessWithData(response)
      ) {
        return this.threadRepository.create(response.data)
      }
    }

    if (!isResponseSuccessWithData(response)) {
      return
    }

    if (entry.change === OutboxEntryChange.Created) {
      return this.threadRepository.create(response.data)
    }

    if (entry.change === OutboxEntryChange.Updated) {
      return this.threadRepository.update(response.data)
    }

    return
  }
}

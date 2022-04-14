/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ThreadRepository } from "App/messages/repositories"
import { OutboxEntry, OutboxEntryChange } from "@mudita/pure"
import { isResponseSuccessWithData } from "App/core/helpers/is-responses-success-with-data.helpers"
import { EntryHandler } from "App/outbox/services/entry-handler.type"
import { ThreadService } from "App/messages/services"

export class ThreadEntryHandlerService implements EntryHandler {
  constructor(
    public threadService: ThreadService,
    private threadRepository: ThreadRepository
  ) {}

  public handleEntry = async (entry: OutboxEntry): Promise<void> => {
    const id = String(entry.record_id)

    if (entry.change === OutboxEntryChange.Deleted) {
      return this.threadRepository.delete(id)
    }

    const response = await this.threadService.getThread(id)

    if (entry.change === OutboxEntryChange.Relation) {
      if (isResponseSuccessWithData(response)) {
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
  }
}

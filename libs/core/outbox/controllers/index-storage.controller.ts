/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { IpcOutboxEvent } from "Core/outbox/constants/controller.constant"
import { EntryChangesEvent, OutboxService } from "Core/outbox/services"

export class IndexStorageController {
  constructor(private outboxService: OutboxService) {}

  @IpcEvent(IpcOutboxEvent.ReadOutboxEntries)
  public loadIndex(): Promise<EntryChangesEvent[] | undefined> {
    return this.outboxService.readOutboxEntries()
  }
}

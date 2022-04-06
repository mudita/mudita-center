/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Endpoint,
  GetEntriesResponseBody,
  Method,
  OutboxCategory,
  OutboxEntry,
  OutboxEntryChange,
  OutboxEntryType,
} from "@mudita/pure"
import { asyncNoop } from "Renderer/utils/noop"
import { DeviceService } from "App/backend/device-service"
import { ContactRepository } from "App/contacts/repositories"
import { ContactService } from "App/contacts/services"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

export class OutboxService {
  // @ts-ignore
  private entryHandlersMap: Record<
    OutboxEntryType,
    (entry: OutboxEntry) => Promise<void>
  > = {
    [OutboxEntryType.Contact]: this.handleContactEntry.bind(this),
    // TODO: add Thread, Message handlers
  }

  constructor(
    private deviceService: DeviceService,
    private contactService: ContactService,
    private contactRepository: ContactRepository
  ) {}

  public async readOutboxEntries(): Promise<boolean> {
    const { status, data } = await this.getOutboxEntriesRequest()

    const entries = data?.entries

    if (status !== RequestResponseStatus.Ok || entries === undefined) {
      return false
    }

    if (entries.length === 0) {
      return false
    }

    for (const entry of entries) {
      const handle = this.entryHandlersMap[entry.type] ?? asyncNoop
      await handle(entry)
    }

    await this.deleteOutboxEntriesRequest(entries.map(({ uid }) => uid))
    return true
  }

  private async handleContactEntry(entry: OutboxEntry): Promise<void> {
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

  private async getOutboxEntriesRequest(): Promise<
    RequestResponse<GetEntriesResponseBody>
  > {
    return await this.deviceService.request({
      endpoint: Endpoint.Outbox,
      method: Method.Get,
      body: {
        category: OutboxCategory.Entries,
      },
    })
  }

  private async deleteOutboxEntriesRequest(
    uids: number[]
  ): Promise<RequestResponse> {
    return await this.deviceService.request({
      endpoint: Endpoint.Outbox,
      method: Method.Delete,
      body: {
        entries: uids,
      },
    })
  }
}

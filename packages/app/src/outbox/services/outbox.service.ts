/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Contact,
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
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { ContactRepository } from "App/contacts/repositories"

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
    private contactRepository: ContactRepository
  ) {}

  public async readOutboxEntries(): Promise<boolean> {
    const { status, data } = await this.getOutboxEntriesRequest()

    const entries = data?.entries

    if (status !== DeviceResponseStatus.Ok || entries === undefined) {
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
    if (entry.change === OutboxEntryChange.Deleted) {
      return this.contactRepository.delete(entry.record_id)
    }

    const { status, data } = await this.getContactRequest(entry.record_id)

    if (status !== DeviceResponseStatus.Ok || data === undefined) {
      return
    }

    if (entry.change === OutboxEntryChange.Created) {
      return this.contactRepository.create(data)
    }

    if (entry.change === OutboxEntryChange.Updated) {
      return this.contactRepository.update(data)
    }
  }

  private async getContactRequest(
    id: number
  ): Promise<DeviceResponse<Contact>> {
    return await this.deviceService.request({
      endpoint: Endpoint.Contacts,
      method: Method.Get,
      body: {
        id,
      },
    })
  }

  private async getOutboxEntriesRequest(): Promise<
    DeviceResponse<GetEntriesResponseBody>
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
  ): Promise<DeviceResponse> {
    return await this.deviceService.request({
      endpoint: Endpoint.Outbox,
      method: Method.Delete,
      body: {
        entries: uids,
      },
    })
  }
}

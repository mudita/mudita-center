/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Contact,
  Endpoint,
  Entry,
  EntryChange,
  EntryType,
  GetEntriesResponseBody,
  Method,
  OutboxCategory,
} from "@mudita/pure"
import { MainProcessIpc } from "electron-better-ipc"
import { asyncNoop } from "Renderer/utils/noop"
import { DeviceService } from "App/backend/device-service"
import { IpcEvent } from "App/data-sync/constants"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { ContactRepository } from "App/data-sync/repositories"

export class OutboxService {
  // @ts-ignore
  private entryHandlersMap: Record<EntryType, (entry: Entry) => Promise<void>> =
    {
      [EntryType.Contact]: this.handleContactEntry.bind(this),
      // TODO: add Thread, Message handlers
    }

  constructor(
    private ipc: MainProcessIpc,
    private deviceService: DeviceService,
    private contactRepository: ContactRepository
  ) {}

  public async readOutboxEntries(): Promise<void> {
    const { status, data } = await this.getOutboxEntriesRequest()

    const entries = data?.entries

    if (status !== DeviceResponseStatus.Ok || entries === undefined) {
      return
    }

    if (entries.length === 0) {
      return
    }

    for (const entry of entries) {
      const handle = this.entryHandlersMap[entry.type] ?? asyncNoop
      await handle(entry)
    }

    await this.deleteOutboxEntriesRequest(entries.map(({ uid }) => uid))

    await this.ipc.sendToRenderers(IpcEvent.DataLoaded)
  }

  private async handleContactEntry(entry: Entry): Promise<void> {
    if (entry.change === EntryChange.Deleted) {
      this.contactRepository.delete(entry.record_id)
    }

    const { status, data } = await this.getContactRequest(entry.record_id)

    if (status !== DeviceResponseStatus.Ok || data === undefined) {
      return
    }

    if (entry.change === EntryChange.Created) {
      this.contactRepository.create(data)
    }

    if (entry.change === EntryChange.Updated) {
      this.contactRepository.update(data)
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

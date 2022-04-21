/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Endpoint,
  GetEntriesResponseBody,
  Method,
  OutboxEntry,
  OutboxCategory,
  OutboxEntryType,
} from "@mudita/pure"
import { asyncNoop } from "Renderer/utils/noop"
import { DeviceService } from "App/backend/device-service"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { EntryHandler } from "App/outbox/services/entry-handler.type"

export type EntryHandlersMapType = Record<OutboxEntryType, EntryHandler>
export type EntryChangesEvent = { entry: OutboxEntry; payload: any }

export class OutboxService {
  constructor(
    private deviceService: DeviceService,
    private entryHandlersMap: EntryHandlersMapType
  ) {}

  public async readOutboxEntries(): Promise<EntryChangesEvent[] | undefined> {
    const changes: EntryChangesEvent[] = []
    const { status, data } = await this.getOutboxEntriesRequest()

    const entries = data?.entries

    if (status !== RequestResponseStatus.Ok || entries === undefined) {
      return
    }

    if (entries.length === 0) {
      return
    }

    for (const entry of entries) {
      const handle = this.entryHandlersMap[entry.type].handleEntry ?? asyncNoop
      const payload = await handle(entry)
      changes.push({ entry, payload })
    }

    await this.deleteOutboxEntriesRequest(entries.map(({ uid }) => uid))
    return changes
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

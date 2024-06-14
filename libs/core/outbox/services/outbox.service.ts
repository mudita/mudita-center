/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "core-device/models"
import { ResultObject } from "Core/core/builder"
import {
  GetEntriesResponseBody,
  OutboxEntry,
} from "Core/device/types/mudita-os"
import { OutboxEntryType, OutboxCategory } from "Core/device/constants"
import { asyncNoop } from "Core/__deprecated__/renderer/utils/noop"
import { DeviceProtocolService } from "device-protocol/feature"
import { EntryHandler } from "Core/outbox/services/entry-handler.type"

export type EntryHandlersMapType = Record<OutboxEntryType, EntryHandler>

export type EntryChangesEvent = { entry: OutboxEntry; payload: unknown }

export class OutboxService {
  constructor(
    private deviceProtocolService: DeviceProtocolService,
    private entryHandlersMap: EntryHandlersMapType
  ) {}

  public async readOutboxEntries(): Promise<EntryChangesEvent[] | undefined> {
    const changes: EntryChangesEvent[] = []
    const result = await this.getOutboxEntriesRequest()

    if (!result.ok) {
      return
    }
    const entries = result.data.entries

    if (entries === undefined || entries.length === 0) {
      return
    }

    for (const entry of entries) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      const handle = this.entryHandlersMap[entry.type].handleEntry ?? asyncNoop
      const payload = await handle(entry)
      changes.push({ entry, payload })
    }

    await this.deleteOutboxEntriesRequest(entries.map(({ uid }) => uid))
    return changes
  }

  private async getOutboxEntriesRequest(): Promise<
    ResultObject<GetEntriesResponseBody>
  > {
    return this.deviceProtocolService.device.request<GetEntriesResponseBody>({
      endpoint: Endpoint.Outbox,
      method: Method.Get,
      body: {
        category: OutboxCategory.Entries,
      },
    })
  }

  private async deleteOutboxEntriesRequest(
    uids: number[]
  ): Promise<ResultObject<unknown>> {
    return this.deviceProtocolService.device.request({
      endpoint: Endpoint.Outbox,
      method: Method.Delete,
      body: {
        entries: uids,
      },
    })
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "App/core/builder"
import { GetEntriesResponseBody, OutboxEntry } from "App/device/types/mudita-os"
import {
  OutboxEntryType,
  OutboxCategory,
  Method,
  Endpoint,
} from "App/device/constants"
import { asyncNoop } from "App/__deprecated__/renderer/utils/noop"
import { DeviceManager } from "App/device-manager/services"
import { EntryHandler } from "App/outbox/services/entry-handler.type"

export type EntryHandlersMapType = Record<OutboxEntryType, EntryHandler>
// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EntryChangesEvent = { entry: OutboxEntry; payload: any }

export class OutboxService {
  constructor(
    private deviceManager: DeviceManager,
    private entryHandlersMap: EntryHandlersMapType
  ) {}

  public async readOutboxEntries(): Promise<EntryChangesEvent[] | undefined> {
    const changes: EntryChangesEvent[] = []
    const { ok, data } = await this.getOutboxEntriesRequest()

    const entries = data?.entries

    if (!ok || entries === undefined) {
      return
    }

    if (entries.length === 0) {
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
    return this.deviceManager.device.request({
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
    return this.deviceManager.device.request({
      endpoint: Endpoint.Outbox,
      method: Method.Delete,
      body: {
        entries: uids,
      },
    })
  }
}

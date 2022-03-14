/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method, RequestConfig } from "../device"

export enum EntryType {
  Message = 1,
  Thread,
  Contact,
}

export enum EntryChange {
  Created = 1,
  Updated,
  Deleted,
}

export interface Entry {
  uid: number
  type: EntryType
  change: EntryChange
  record_id: number
}

export enum OutboxCategory {
  Entries = "Entries",
}

export interface GetEntriesConfigBody {
  category: OutboxCategory
}

export interface GetEntriesRequestConfig
  extends RequestConfig<GetEntriesConfigBody> {
  endpoint: Endpoint.Outbox
  method: Method.Get
}

export interface DeleteEntriesConfigBody {
  entries: Entry["uid"][]
}

export interface DeleteEntriesRequestConfig
  extends RequestConfig<DeleteEntriesConfigBody> {
  endpoint: Endpoint.Outbox
  method: Method.Delete
}

export interface GetEntriesResponseBody {
  entries: Entry[]
}

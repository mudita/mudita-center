/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method, RequestConfig } from "../device/index.js"

export enum OutboxEntryType {
  Message = 1,
  Thread,
  Contact,
}

export enum OutboxEntryChange {
  Created = 1,
  Updated,
  Deleted,

  // to handle Entry relation
  Relation = 100,
}

export interface OutboxEntry {
  uid: number
  type: OutboxEntryType
  change: OutboxEntryChange
  record_id: number
}

export enum OutboxCategory {
  Entries = "entries",
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
  entries: OutboxEntry["uid"][]
}

export interface DeleteEntriesRequestConfig
  extends RequestConfig<DeleteEntriesConfigBody> {
  endpoint: Endpoint.Outbox
  method: Method.Delete
}

export interface GetEntriesResponseBody {
  entries: OutboxEntry[]
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface Thread {
  contactID: number
  isUnread: boolean
  lastUpdatedAt: number
  messageCount: number
  messageSnippet: string
  messageType: number
  numberID: number
  threadID: number
}

export interface GetThreadsBody {
  category: "thread"
  limit?: number
  offset?: number
}

export interface GetThreadResponseBody {
  entries: Thread[]
  totalCount: number
  nextPage?: { limit: number; offset: number }
}

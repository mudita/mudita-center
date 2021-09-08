/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum MessagesCategory {
  thread = "thread",
  message = "message",
}

export interface Thread {
  contactID: number
  isUnread: boolean
  lastUpdatedAt: number
  messageCount: number
  messageSnippet: string
  messageType: number
  number: string
  threadID: number
}

export interface GetThreadsBody {
  category: MessagesCategory.thread
  limit?: number
  offset?: number
}

export interface GetThreadResponseBody {
  entries: Thread[]
  totalCount: number
  nextPage?: { limit: number; offset: number }
}

export enum MessageType {
  DRAFT = 1,
  FAILED = 2,
  INBOX = 4,
  OUTBOX = 8,
  QUEUED = 16,
  INPUT = 18,
  UNKNOWN = 255,
}

export interface Message {
  contactID: number
  messageBody: string
  messageID: number
  messageType: MessageType
  createdAt: number
  threadID: number
  number: string
}

export interface GetMessagesBody {
  category: MessagesCategory.message
  threadID?: number
  limit?: number
  offset?: number
}

export interface GetMessageResponseBody {
  entries: Message[]
  totalCount: number
  nextPage?: { limit: number; offset: number }
}

export interface PostMessagesBody {
  category: MessagesCategory.message
  number: string
  messageBody: string
}

export type PostMessagesResponseBody = Message

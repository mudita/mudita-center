/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PaginationBody } from "../device"

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

export interface GetThreadsBody extends Partial<PaginationBody> {
  category: MessagesCategory.thread
}

export interface GetThreadBody {
  category: MessagesCategory.thread
  threadID: number
}

export interface GetThreadResponseBody {
  entries: Thread[]
  totalCount: number
  nextPage?: PaginationBody
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

export interface GetMessagesBody extends Partial<PaginationBody> {
  category: MessagesCategory.message
  threadID?: number
}

export interface GetMessageBody {
  category: MessagesCategory.message
  messageID: number
}

export interface GetMessageResponseBody {
  entries: Message[]
  totalCount: number
  nextPage?: PaginationBody
}

export interface PostMessagesBody {
  category: MessagesCategory.message
  number: string
  messageBody: string
}

export interface UpdateThreadReadStatus {
  category: MessagesCategory.thread
  threadID: number
  isUnread: boolean
}

export type PostMessagesResponseBody = Message

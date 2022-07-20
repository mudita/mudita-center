/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PaginationBody } from "./response.types"

export enum MessagesCategory {
  thread = "thread",
  message = "message",
  template = "template",
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
  messageType?: MessageType
}

export interface PutMessageBody {
  category: MessagesCategory.message
  messageBody: string
  messageID: number
  messageType: MessageType
}

export interface UpdateThreadReadStatus {
  category: MessagesCategory.thread
  threadID: number
  isUnread: boolean
}

export interface GetTemplateBody {
  category: MessagesCategory.template
  templateID: number
}

export type PostMessagesResponseBody = Message

export interface Template {
  templateID: number
  lastUsedAt: number
  templateBody: string
  order?: number
}

export interface PostTemplateBody {
  category: MessagesCategory.template
  templateBody: string
  order?: number
}

export interface GetTemplateBody {
  category: MessagesCategory.template
  templateID: number
}

export interface PutTemplateBody {
  category: MessagesCategory.template
  templateID: number
  templateBody: string
}

export interface UpdateTemplateOrder {
  category: MessagesCategory.template
  templateID: number
  order?: number
}

export interface DeleteTemplateBody {
  category: MessagesCategory.template
  templateID: number
}

export type PostTemplateResponseBody = Template
export type GetTemplateResponseBody = Template
export type PutTemplateResponseBody = Template

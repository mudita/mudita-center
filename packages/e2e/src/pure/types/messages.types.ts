/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

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

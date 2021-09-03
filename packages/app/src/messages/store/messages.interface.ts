/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Caller } from "Renderer/models/calls/calls.interface"

export enum VisibilityFilter {
  All = "all",
  Unread = "unread",
}

export type Author = Pick<Caller, "id">

export enum ResultState {
  Loading,
  Loaded,
  Empty,
  Error,
}

export enum MessageType {
  INBOX = "INBOX",
  OUTBOX = "OUTBOX",
}

export interface Message {
  id: string
  date: Date
  content: string
  contactId: string
  number: string
  threadId: string
  messageType: MessageType
}

export type NewMessage = Pick<Message, "number" | "content">

export type MessageMap = { [id: string]: Message }

export interface Thread {
  id: string
  contactId: string
  number: string
  lastUpdatedAt: Date
  messageSnippet: string
  unread: boolean
}

export type ThreadMap = { [id: string]: Thread }

export type MessageIdsInThreadMap = { [id: string]: Message["id"][] }

export type MessagesState = Readonly<{
  threadMap: ThreadMap
  messageMap: MessageMap
  messageIdsInThreadMap: MessageIdsInThreadMap
  searchValue: string
  visibilityFilter?: VisibilityFilter
  resultState: ResultState
  messagesResultStateMap: { [id: string]: ResultState }
}>

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Caller } from "Renderer/models/calls/calls.interface"

export enum VisibilityFilter {
  All = "all",
  Unread = "unread",
}

export type Author = Pick<Caller, "id">

export enum ResultsState {
  Loading,
  Loaded,
  Empty,
  Error,
}

export enum MessageType {
  DRAFT = "DRAFT",
  FAILED = "FAILED",
  INBOX = "INBOX",
  OUTBOX = "OUTBOX",
  QUEUED = "QUEUED",
  INPUT = "INPUT",
  UNKNOWN = "UNKNOWN",
}

export interface Message {
  id: string
  date: Date
  content: string
  contactId: string
  threadId: string
  messageType: MessageType
}

export interface Thread {
  id: string
  contactId: string
  lastUpdatedAt: Date
  messageSnippet: string
  unread: boolean
}

export interface NormalizedObjects<T> {
  byId: { [id: string]: T }
  allIds: string[]
}

export type MessagesInThreads = { [id: string]: string[] }

export type MessagesState = Readonly<{
  threads: NormalizedObjects<Thread>
  messages: NormalizedObjects<Message>
  messagesInThreads: MessagesInThreads
  searchValue: string
  visibilityFilter?: VisibilityFilter
  resultsState: ResultsState
}>

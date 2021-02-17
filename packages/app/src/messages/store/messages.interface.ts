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

enum MessageType {
  DRAFT   = "DRAFT",
  FAILED  = "FAILED",
  INBOX   = "INBOX",
  OUTBOX  = "OUTBOX",
  QUEUED  = "QUEUED",
  INPUT   = "INPUT",
  UNKNOWN = "UNKNOWN"
}

export interface Message {
  id: string
  contactId: string
  content: string
  messageType: MessageType
}

export interface Thread {
  id: string
  contactId: string
  unread: boolean
  lastUpdatedAt: Date
  messageSnippet: string
  messages: Message[]
}

export type MessagesState = Readonly<{
  threads: Thread[]
  searchValue: string
  visibilityFilter?: VisibilityFilter
  resultsState: ResultsState
}>

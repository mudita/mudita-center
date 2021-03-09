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

export interface Message {
  id: string
  date: Date
  content: string
  interlocutor?: boolean
  author: Author
}

export interface Thread {
  id: string
  caller: Caller
  unread: boolean
  messages: Message[]
}

export type MessagesState = Readonly<{
  threads: Thread[]
  searchValue: string
  visibilityFilter?: VisibilityFilter
  resultsState: ResultsState
}>

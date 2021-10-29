/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Caller } from "Renderer/models/calls/calls.interface"
import { Contact } from "App/contacts/store/contacts.type"
import { PayloadAction } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import { LoadMessagesByIdError, LoadThreadsError } from "App/messages/errors"
import { GetMessagesBody } from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"

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
  phoneNumber: string
  threadId: string
  messageType: MessageType
}

export type NewMessage = Pick<Message, "phoneNumber" | "content">

export type MessageMap = { [id: string]: Message }

export interface Thread {
  id: string
  phoneNumber: string
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
  threadsTotalCount: number
  visibilityFilter: VisibilityFilter
  threadsState: ResultState
  messagesStateMap: { [id: string]: ResultState }
  error: Error | string | null
}>

export enum ReceiverIdentification {
  unknown,
  primary,
  secondary,
}

export interface Receiver extends Pick<Contact, "firstName" | "lastName"> {
  phoneNumber: string
  identification: ReceiverIdentification
}

export type LoadThreadsRejectAction = PayloadAction<
  LoadThreadsError,
  MessagesEvent.LoadThreads
>

export type LoadMessagesByIdRejectAction = PayloadAction<
  LoadMessagesByIdError,
  MessagesEvent.LoadMessagesById,
  { arg: GetMessagesBody }
>

export type LoadMessagesByIdStatusAction = PayloadAction<
  undefined,
  MessagesEvent.LoadMessagesById,
  { arg: GetMessagesBody }
>

export type ToggleThreadReadStatusAction = PayloadAction<
  string[],
  MessagesEvent.ToggleThreadReadStatus
>

export type MarkThreadAsReadAction = PayloadAction<
  string,
  MessagesEvent.MarkThreadAsRead
>

export type DeleteThreadsAction = PayloadAction<
  string[],
  MessagesEvent.DeleteThreads
>

export type ChangeVisibilityFilterAction = PayloadAction<
  MessagesState["visibilityFilter"],
  MessagesEvent.ChangeVisibilityFilter
>

export type ChangeSearchValueAction = PayloadAction<
  string,
  MessagesEvent.ChangeSearchValue
>

export type SetThreadsAction = PayloadAction<Thread[], MessagesEvent.SetThreads>

export type SetThreadsTotalCountAction = PayloadAction<
  number,
  MessagesEvent.SetThreadsTotalCount
>

export type SetMessagesAction = PayloadAction<
  Message[],
  MessagesEvent.SetMessages
>

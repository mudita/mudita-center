/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Caller } from "Renderer/models/calls/calls.interface"
import { Contact } from "App/contacts/store/contacts.type"
import { PayloadAction } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import { LoadMessagesByIdError, LoadThreadsError } from "App/messages/errors"

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
  phoneNumber: string
  threadId: string
  messageType: MessageType
}

export type NewMessage = Pick<Message, "phoneNumber" | "content">

export type MessageMap = { [id: string]: Message }

export interface Thread {
  id: string
  contactId: string
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
  visibilityFilter: VisibilityFilter
  resultState: ResultState
  messagesResultStateMap: { [id: string]: ResultState }
}>

export enum ReceiverIdentification {
  unknown,
  primary,
  secondary,
}

export interface Receiver extends Pick<Contact, "firstName" | "lastName"> {
  contactId: string
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
  { arg: string }
>

export type LoadMessagesByIdStatusAction = PayloadAction<
  undefined,
  MessagesEvent.LoadMessagesById,
  { arg: string }
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

export type SetMessagesAction = PayloadAction<
  Message[],
  MessagesEvent.SetMessages
>

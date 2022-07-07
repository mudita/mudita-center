/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { Caller } from "App/__deprecated__/renderer/models/calls/calls.interface"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { Message, Thread } from "App/messages/dto"
import {
  MessagesEvent,
  VisibilityFilter,
  ResultState,
} from "App/messages/constants"
import {
  ResendMessageError,
  DeleteMessageError,
  DeleteThreadError,
} from "App/messages/errors"

export type Author = Pick<Caller, "id">

export type MessageMap = { [id: string]: Message }

export type ThreadMap = { [id: string]: Thread }

export type MessageIdsInThreadMap = { [id: string]: Message["id"][] }

export type MessagesState = Readonly<{
  threadMap: ThreadMap
  messageMap: MessageMap
  messageIdsInThreadMap: MessageIdsInThreadMap
  searchValue: string
  visibilityFilter: VisibilityFilter
  threadsState: ResultState
  messagesStateMap: { [id: string]: ResultState }
  error: Error | string | null
  loaded: boolean
  loading: boolean
  currentlyDeletingMessageId: MessageId | null
}>

export enum ReceiverIdentification {
  unknown,
  primary,
  secondary,
}

export type MessageId = string

export interface Receiver extends Pick<Contact, "firstName" | "lastName"> {
  phoneNumber: string
  identification: ReceiverIdentification
}

export type AddNewMessageAction = PayloadAction<
  {
    messageParts: {
      message: Message
      thread?: Thread
    }[]
  },
  MessagesEvent.AddNewMessage
>

export type ResendMessageRejectedAction = PayloadAction<
  ResendMessageError,
  MessagesEvent.AddNewMessage,
  void,
  Error | string | null
>

export type ResendMessageFulfilledAction = PayloadAction<
  {
    messageParts: {
      message: Message
      thread?: Thread
    }[]
  },
  MessagesEvent.AddNewMessage
>

export type DeleteMessagePendingAction = PayloadAction<
  undefined,
  MessagesEvent.DeleteMessage,
  {
    arg: MessageId
  }
>

export type DeleteMessageAction = PayloadAction<
  MessageId,
  MessagesEvent.DeleteMessage
>

export type DeleteMessageRejectedAction = PayloadAction<
  DeleteMessageError,
  MessagesEvent.DeleteMessage,
  void,
  Error | string | null
>

export type ToggleThreadsReadStatusPendingAction = PayloadAction<
  undefined,
  MessagesEvent.ToggleThreadsReadStatus,
  {
    arg: Thread[]
  }
>
export type MarkThreadsReadStatusPendingAction = PayloadAction<
  undefined,
  MessagesEvent.ToggleThreadsReadStatus,
  {
    arg: Thread[]
  }
>
export type MarkThreadsReadStatusAction = PayloadAction<
  Thread[],
  MessagesEvent.ToggleThreadsReadStatus,
  {
    arg: Thread[]
  }
>

export type DeleteThreadsAction = PayloadAction<
  string[],
  MessagesEvent.DeleteThreads
>

export type DeleteThreadsRejectedAction = PayloadAction<
  DeleteThreadError,
  MessagesEvent.DeleteThreads,
  void,
  Error | null | string
>

export type ChangeVisibilityFilterAction = PayloadAction<
  MessagesState["visibilityFilter"],
  MessagesEvent.ChangeVisibilityFilter
>

export type ChangeSearchValueAction = PayloadAction<
  string,
  MessagesEvent.ChangeSearchValue
>

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChangeEvent } from "react"
import { PaginationBody } from "Core/device/types/mudita-os"
import { PayloadAction } from "@reduxjs/toolkit"
import { Contact } from "Core/contacts/reducers/contacts.interface"
import { ResultState } from "Core/messages/constants"
import { MessagesState } from "Core/messages/reducers/messages.interface"
import { Thread, NewMessage, Message } from "Core/messages/dto"
import { Notification } from "Core/notification/types"
import { Settings } from "Core/settings/dto"
import { Receiver } from "Core/messages/reducers"
import { Template } from "Core/templates/dto"
import { CreateMessageDataResponse } from "Core/messages/services"
import { SearchParams, SearchResult } from "Core/search/dto"
import { State } from "Core/core/constants"

export interface Content {
  id: string
  text: string
}

export interface MessagesServiceState {
  messageDeleting: boolean
  messageDeletingConfirmation: boolean
  messageDeletingInfo: boolean
  attachContact: boolean
  attachTemplate: boolean
  threadDeleting: boolean
  threadDeletingConfirmation: boolean
  threadDeletingInfo: boolean
  browseContact: boolean
  draftDeleting: boolean
}

export interface MessagesProps extends Pick<Settings, "language"> {
  searchValue: MessagesState["data"]["searchValue"]
  threadsState: MessagesState["data"]["threadsState"]
  receivers: Receiver[]
  messageLayoutNotifications: Notification[]
  loadThreads: (
    pagination: PaginationBody
  ) => Promise<PayloadAction<PaginationBody | undefined>>
  getActiveMessagesByThreadIdSelector: (threadId: string) => Message[]
  getContact: (contactId: string) => Contact | undefined
  getReceiver: (phoneNumber: string) => Receiver
  getContactByPhoneNumber: (phoneNumber: string) => Contact | undefined
  getMessagesStateByThreadId: (threadId: string) => ResultState
  isContactCreatedByPhoneNumber: (phoneNumber: string) => boolean
  addNewMessage: (
    newMessage: NewMessage
  ) => Promise<PayloadAction<CreateMessageDataResponse>>
  deleteMessage: (messageId: string) => Promise<string>
  updateMessage: (message: Message) => Promise<void>
  removeLayoutNotification: (notificationId: string) => void
  currentlyDeletingMessageId: string | null
  resendMessage: (messageId: string) => void
  changeSearchValue?: (event: ChangeEvent<HTMLInputElement>) => void
  deleteThreads?: (ids: string[]) => void
  threads: Thread[]
  toggleReadStatus?: (threads: Thread[]) => void
  markThreadsReadStatus?: (threads: Thread[]) => void
  templates: Template[]
  error: Error | string | null
  selectedItems: { rows: string[] }
  toggleItem: (threadId: string) => void
  selectAllItems: () => void
  resetItems: () => void
  searchMessages: (searchParams: SearchParams) => void
  searchMessagesForPreview: (searchParams: SearchParams) => void
  searchResult: SearchResult
  searchPreviewResult: SearchResult
  state: State
}

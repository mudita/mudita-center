/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import { Message, MessagesState, Thread } from "App/messages/reducers"

export const toggleThreadsReadStatus = createAction<string[]>(
  MessagesEvent.ToggleThreadReadStatus
)

export const markThreadsAsRead = createAction<string[]>(
  MessagesEvent.MarkThreadAsRead
)

export const deleteThreads = createAction<string[]>(MessagesEvent.DeleteThreads)

export const changeVisibilityFilter = createAction<
  MessagesState["visibilityFilter"]
>(MessagesEvent.ChangeVisibilityFilter)

export const changeSearchValue = createAction<string>(
  MessagesEvent.ChangeSearchValue
)

export const setThreads = createAction<Thread[]>(MessagesEvent.SetThreads)

export const setMessages = createAction<Message[]>(MessagesEvent.SetMessages)

export const devClearAllThreads = createAction(MessagesEvent.DevClearAllThreads)

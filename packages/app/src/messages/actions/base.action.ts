/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import { MessagesState } from "App/messages/reducers"

export const toggleThreadsReadStatus = createAction<string[]>(
  MessagesEvent.ToggleThreadReadStatus
)

export const markThreadsAsRead = createAction<string[]>(
  MessagesEvent.MarkThreadAsRead
)

export const changeVisibilityFilter = createAction<
  MessagesState["visibilityFilter"]
>(MessagesEvent.ChangeVisibilityFilter)

export const changeSearchValue = createAction<string>(
  MessagesEvent.ChangeSearchValue
)

export const clearAllThreads = createAction(MessagesEvent.ClearAllThreads)

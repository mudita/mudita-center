/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { MessagesEvent } from "Core/messages/constants"
import { MessagesState } from "Core/messages/reducers"

export const setInitialMessagesState = createAction(
  MessagesEvent.SetInitialMessagesState
)

export const changeVisibilityFilter = createAction<
  MessagesState["data"]["visibilityFilter"]
>(MessagesEvent.ChangeVisibilityFilter)

export const changeSearchValue = createAction<string>(
  MessagesEvent.ChangeSearchValue
)

export const clearAllThreads = createAction(MessagesEvent.ClearAllThreads)

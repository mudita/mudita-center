/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import getMessagesByThreadId from "Renderer/requests/get-messages-by-thread-id.request"
import { setMessages } from "App/messages/actions/base.action"
import { LoadMessagesByIdError } from "App/messages/errors"

export const LoadMessagesById = createAsyncThunk<undefined, string>(
  MessagesEvent.LoadMessagesById,
  async (threadId, { dispatch, rejectWithValue }) => {
    const { data = [], error } = await getMessagesByThreadId(threadId)

    if (error) {
      return rejectWithValue(new LoadMessagesByIdError(""))
    }

    dispatch(setMessages(data))

    return
  }
)

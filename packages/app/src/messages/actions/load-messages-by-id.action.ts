/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PaginationBody } from "@mudita/pure"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import getMessagesByThreadId from "Renderer/requests/get-messages-by-thread-id.request"
import { setMessages } from "App/messages/actions/base.action"
import { LoadMessagesByIdError } from "App/messages/errors"
import { GetMessagesBody } from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"

export const loadMessagesById = createAsyncThunk<
  PaginationBody | undefined,
  GetMessagesBody
>(
  MessagesEvent.LoadMessagesById,
  async (body, { dispatch, rejectWithValue }) => {
    const { data, error } = await getMessagesByThreadId(body)

    if (error || data === undefined) {
      return rejectWithValue(
        new LoadMessagesByIdError("Load Messages By Id request failed")
      )
    }

    dispatch(setMessages(data.data))

    return data.nextPage
  }
)

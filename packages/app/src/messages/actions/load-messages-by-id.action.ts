/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PaginationBody } from "@mudita/pure"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import { getMessagesByThreadIdRequest } from "App/messages/requests"
import { setMessages } from "App/messages/actions/base.action"
import { LoadMessagesByIdError } from "App/messages/errors"
import { GetMessagesBody } from "App/messages/services"

export const loadMessagesById = createAsyncThunk<
  PaginationBody | undefined,
  GetMessagesBody
>(
  MessagesEvent.LoadMessagesById,
  async (body, { dispatch, rejectWithValue }) => {
    const { data, error } = await getMessagesByThreadIdRequest(body)

    if (error || data === undefined) {
      return rejectWithValue(
        new LoadMessagesByIdError("Load Messages By Id request failed")
      )
    }

    dispatch(setMessages(data.data))

    return data.nextPage
  }
)

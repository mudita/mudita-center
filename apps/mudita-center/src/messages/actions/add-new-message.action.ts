/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MessagesError, MessagesEvent } from "App/messages/constants"
import { createMessageRequest } from "App/messages/requests"
import { NewMessage } from "App/messages/dto"
import { CreateMessageDataResponse } from "App/messages/services"
import { AppError } from "App/core/errors"

export const addNewMessage = createAsyncThunk<
  CreateMessageDataResponse,
  NewMessage
>(MessagesEvent.AddNewMessage, async (newMessage, { rejectWithValue }) => {
  const { data, error } = await createMessageRequest(newMessage)

  if (error || data === undefined) {
    return rejectWithValue(
      new AppError(
        MessagesError.AddNewMessage,
        "Add New Message request failed"
      )
    )
  }

  return data
})

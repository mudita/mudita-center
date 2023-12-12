/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MessagesError, MessagesEvent } from "Core/messages/constants"
import { createMessageRequest } from "Core/messages/requests"
import { NewMessage } from "Core/messages/dto"
import { CreateMessageDataResponse } from "Core/messages/services"
import { AppError } from "Core/core/errors"

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

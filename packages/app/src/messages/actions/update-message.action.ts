/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MessagesError, MessagesEvent } from "App/messages/constants"
import { updateMessageRequest } from "App/messages/requests"
import { Message } from "App/messages/dto"
import { AppError } from "App/core/errors"

export const updateMessage = createAsyncThunk<AppError | void, Message>(
  MessagesEvent.UpdateMessage,
  async (message, { rejectWithValue }) => {
    const { ok, error } = await updateMessageRequest(message)

    if (error || !ok) {
      return rejectWithValue(
        new AppError(
          MessagesError.UpdateMessageError,
          (error as unknown as Error)?.message || "Message update failed"
        )
      )
    }

    return
  }
)

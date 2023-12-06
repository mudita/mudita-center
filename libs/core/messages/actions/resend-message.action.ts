/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "Core/core/errors"
import { MessagesError, MessagesEvent } from "Core/messages/constants"
import { resendMessageRequest } from "Core/messages/requests/resend-message.request"
import { CreateMessageDataResponse } from "Core/messages/services"

export const resendMessage = createAsyncThunk<
  AppError<MessagesError.ResendMessageError> | CreateMessageDataResponse,
  string
>(MessagesEvent.ResendMessage, async (messageId, { rejectWithValue }) => {
  const { data, error } = await resendMessageRequest(messageId)

  if (error || !data) {
    return rejectWithValue(
      new AppError(
        MessagesError.ResendMessageError,
        (error as unknown as Error)?.message || "Resending failed"
      )
    )
  }

  return data
})

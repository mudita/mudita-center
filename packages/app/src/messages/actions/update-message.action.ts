/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { MessagesEvent } from "App/messages/constants"
import { updateMessageRequest } from "App/messages/requests"
import { Message } from "App/messages/dto"
import { UpdateMessageError } from "App/messages/errors"

export const updateMessage = createAsyncThunk<void, Message>(
  MessagesEvent.UpdateMessage,
  async (message, { rejectWithValue }) => {
    const { status, error } = await updateMessageRequest(message)

    if (error || status !== RequestResponseStatus.Ok) {
      rejectWithValue(
        new UpdateMessageError(
          error?.message || "Update message request failed"
        )
      )
    }
  }
)

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { toggleThreadsReadStatusRequest } from "Core/messages/requests"
import { MessagesError, MessagesEvent } from "Core/messages/constants"
import { Thread } from "Core/messages/dto"
import { AppError } from "Core/core/errors"

export const toggleThreadsReadStatus = createAsyncThunk<
  Error | Thread[],
  Thread[]
>(
  MessagesEvent.ToggleThreadsReadStatus,
  async (threads, { rejectWithValue }) => {
    const { error } = await toggleThreadsReadStatusRequest(threads)
    if (error && error.data === undefined) {
      return rejectWithValue(
        new AppError(
          MessagesError.ToggleThreadsReadStatus,
          "Toggle threads read status request failed"
        )
      )
    }

    return threads
  }
)

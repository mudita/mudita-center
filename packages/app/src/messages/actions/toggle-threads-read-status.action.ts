/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { toggleThreadsReadStatusRequest } from "App/messages/requests"
import { MessagesEvent } from "App/messages/constants"
import { ToggleThreadsReadStatusError } from "App/messages/errors"
import { Thread } from "App/messages/reducers/messages.interface"

export const toggleThreadsReadStatus = createAsyncThunk<
  Error | Thread[],
  Thread[]
>(
  MessagesEvent.ToggleThreadReadStatus,
  async (threads, { rejectWithValue }) => {
    const { error } = await toggleThreadsReadStatusRequest(threads)
    if (error && error.data === undefined) {
      return rejectWithValue(
        new ToggleThreadsReadStatusError(
          "Toggle threads read status request failed"
        )
      )
    }

    return threads
  }
)

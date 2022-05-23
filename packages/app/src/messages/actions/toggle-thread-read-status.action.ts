/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { toggleThreadReadStatusRequest } from "App/messages/requests"
import { MessagesEvent } from "App/messages/constants"
import { ToggleThreadReadStatusError } from "App/messages/errors"
import { Thread } from "App/messages/reducers/messages.interface"

export const toggleThreadReadStatus = createAsyncThunk<
  Error | Thread[],
  Thread[]
>(
  MessagesEvent.ToggleThreadReadStatus,
  async (threads, { rejectWithValue }) => {
    console.log("action ids", threads)
    const { error } = await toggleThreadReadStatusRequest(threads)
    if (error && error.data === undefined) {
      return rejectWithValue(
        new ToggleThreadReadStatusError(
          "Toggle thread read status request failed"
        )
      )
    }

    return threads
  }
)

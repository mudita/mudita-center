/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { toggleThreadsReadStatusRequest } from "App/messages/requests"
import { MessagesError, MessagesEvent } from "App/messages/constants"
import { Thread } from "App/messages/dto"
import { AppError } from "App/core/errors"

export const markThreadsReadStatus = createAsyncThunk<
  Error | Thread[],
  Thread[]
>(MessagesEvent.MarkThreadsReadStatus, async (threads, { rejectWithValue }) => {
  const { error } = await toggleThreadsReadStatusRequest(
    threads.map((thread) => ({ ...thread, unread: true }))
  )
  if (error && error.data === undefined) {
    return rejectWithValue(
      new AppError(
        MessagesError.MarkThreadsReadStatus,
        "Mark threads read status request failed"
      )
    )
  }

  return threads
})

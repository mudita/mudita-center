/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { toggleThreadsReadStatusRequest } from "App/messages/requests"
import { MessagesEvent } from "App/messages/constants"
import { MarkThreadsReadStatusError } from "App/messages/errors"
import { Thread } from "App/messages/reducers/messages.interface"

export const markThreadsReadStatus = createAsyncThunk<
  Error | Thread[],
  Thread[]
>(MessagesEvent.MarkThreadsReadStatus, async (threads, { rejectWithValue }) => {
  const { error } = await toggleThreadsReadStatusRequest(
    threads.map((thread) => ({ ...thread, unread: true }))
  )
  if (error && error.data === undefined) {
    return rejectWithValue(
      new MarkThreadsReadStatusError("Mark threads read status request failed")
    )
  }

  return threads
})

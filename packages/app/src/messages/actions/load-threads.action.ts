/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import getThreads from "Renderer/requests/get-threads.request"
import { LoadThreadsError } from "App/messages/errors"
import { setThreads } from "App/messages/actions/base.action"

export const loadThreads = createAsyncThunk(
  MessagesEvent.LoadThreads,
  async (_, { dispatch, rejectWithValue }) => {
    const { data = [], error } = await getThreads()

    if (error) {
      return rejectWithValue(new LoadThreadsError(""))
    }

    dispatch(setThreads(data))

    return
  }
)

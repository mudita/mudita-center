/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import getThreads from "Renderer/requests/get-threads.request"
import { LoadThreadsError } from "App/messages/errors"
import { setThreadsTotalCount } from "App/messages/actions/base.action"

export const loadThreadsTotalCount = createAsyncThunk<undefined, undefined>(
  MessagesEvent.LoadThreadsTotalCount,
  async (_, { dispatch, rejectWithValue }) => {
    const { data, error } = await getThreads({ limit: 1, offset: 0 })

    if (error || data === undefined) {
      return rejectWithValue(new LoadThreadsError("Get Threads request failed"))
    }

    dispatch(setThreadsTotalCount(data.totalCount))

    return
  }
)

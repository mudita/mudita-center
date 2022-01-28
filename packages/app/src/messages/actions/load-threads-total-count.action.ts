/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import getThreads from "Renderer/requests/get-threads.request"
import { LoadThreadsError } from "App/messages/errors"
import { setThreadsTotalCount } from "App/messages/actions/base.action"
import { ReduxRootState, RootState } from "Renderer/store"

export const loadThreadsTotalCount = createAsyncThunk<undefined, undefined>(
  MessagesEvent.LoadThreadsTotalCount,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState & ReduxRootState
    const { data, error } = await getThreads({ limit: 1, offset: 0 })

    if (error || data === undefined) {
      return rejectWithValue(new LoadThreadsError("Get Threads request failed"))
    }

    // check that any threads aren't removed during on sync data between Application & API
    if (
      state.messages.threadsTotalCount === 0 ||
      state.messages.threadsTotalCount <= data.totalCount
    ) {
      dispatch(setThreadsTotalCount(data.totalCount))
      return
    }

    return
  }
)

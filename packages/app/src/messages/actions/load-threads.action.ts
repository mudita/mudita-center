/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import { getThreadsRequest } from "App/messages/requests"
import { LoadThreadsError } from "App/messages/errors"
import {
  setThreads,
  setThreadsTotalCount,
} from "App/messages/actions/base.action"
import { PaginationBody } from "@mudita/pure"
import { ReduxRootState, RootState } from "Renderer/store"

export const loadThreads = createAsyncThunk<
  PaginationBody | undefined,
  PaginationBody
>(
  MessagesEvent.LoadThreads,
  async (pagination, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState & ReduxRootState
    const { data, error } = await getThreadsRequest(pagination)

    if (error || data === undefined) {
      return rejectWithValue(new LoadThreadsError("Get Threads request failed"))
    }

    // check that any threads aren't removed during on sync data between Application & API
    if (
      state.messages.threadsTotalCount === 0 ||
      state.messages.threadsTotalCount <= data.totalCount
    ) {
      dispatch(setThreadsTotalCount(data.totalCount))
      dispatch(setThreads(data.data))
      return data.nextPage
    }

    const { data: renewedData, error: renewedError } = await getThreadsRequest({
      ...pagination,
      offset: 0,
    })
    if (renewedError || renewedData === undefined) {
      return rejectWithValue(new LoadThreadsError("Get Threads request failed"))
    }

    dispatch(setThreadsTotalCount(renewedData.totalCount))
    dispatch(setThreads(renewedData.data))

    return renewedData.nextPage
  }
)

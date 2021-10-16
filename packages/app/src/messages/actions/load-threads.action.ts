/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import getThreads from "Renderer/requests/get-threads.request"
import { LoadThreadsError } from "App/messages/errors"
import { setThreads } from "App/messages/actions/base.action"
import { PaginationBody } from "@mudita/pure"

export const loadThreads = createAsyncThunk<
  PaginationBody | undefined,
  PaginationBody
>(
  MessagesEvent.LoadThreads,
  async (pagination, { dispatch, rejectWithValue }) => {
    const { data, error } = await getThreads(pagination)

    if (error || data === undefined) {
      return rejectWithValue(new LoadThreadsError(""))
    }

    dispatch(setThreads(data.data))

    return data.nextPage
  }
)

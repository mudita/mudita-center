/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { deleteThreadsRequest } from "App/messages/requests"
import { MessagesEvent } from "App/messages/constants"
import { AppError } from "App/core/errors"

export const deleteThreads = createAsyncThunk<Error | string[], string[]>(
  MessagesEvent.DeleteThreads,
  async (ids, { rejectWithValue }) => {
    const { error } = await deleteThreadsRequest(ids)
    if (error && error.data === undefined) {
      return rejectWithValue(
        new AppError(
          MessagesEvent.DeleteThreads,
          "Delete Thread request failed"
        )
      )
    }

    if (error && error.data !== undefined) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const successIds = ids.filter((id) => error.data.includes(id))
      return successIds
    }

    return ids
  }
)

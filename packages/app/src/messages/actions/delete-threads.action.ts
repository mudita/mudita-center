/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { deleteThreadsRequest } from "App/messages/requests"
import { MessagesEvent } from "App/messages/constants"
import { DeleteThreadError } from "App/messages/errors"

export const deleteThreads = createAsyncThunk<Error | string[], string[]>(
  MessagesEvent.DeleteThreads,
  async (ids, { rejectWithValue }) => {
    const { error } = await deleteThreadsRequest(ids)
    if (error && error.data === undefined) {
      return rejectWithValue(
        new DeleteThreadError("Delete Thread request failed")
      )
    }

    if (error && error.data !== undefined) {
      const successIds = ids.filter((id) => error.data.includes(id))
      return successIds
    }

    return ids
  }
)

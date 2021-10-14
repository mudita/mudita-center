/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"

export const loadThreads = createAsyncThunk(
  MessagesEvent.LoadThreads,
  async (_) => {
    return
  }
)

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import { createMessageRequest } from "App/messages/requests"
import { NewMessage } from "App/messages/reducers"
import { AddNewMessageError } from "App/messages/errors"
import { CreateMessageDataResponse } from "App/messages/services"

export const addNewMessage = createAsyncThunk<
  CreateMessageDataResponse,
  NewMessage
>(MessagesEvent.AddNewMessage, async (newMessage, { rejectWithValue }) => {
  const { data, error } = await createMessageRequest(newMessage)

  if (error || data === undefined) {
    return rejectWithValue(
      new AddNewMessageError("Add New Message request failed")
    )
  }

  return data
})

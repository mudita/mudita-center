/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import { deleteMessageRequest } from "App/messages/requests"
import { DeleteMessageError } from "../errors/delete-message.action.error"

type DeletedMessageId = string

export const deleteMessage = createAsyncThunk<
  Error | DeletedMessageId,
  DeletedMessageId
>(MessagesEvent.DeleteMessage, async (messageId, { rejectWithValue }) => {
  const { error } = await deleteMessageRequest(messageId)

  if (error) {
    return rejectWithValue(
      new DeleteMessageError("Delete message request failed")
    )
  }

  return messageId
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import addMessage from "Renderer/requests/add-message.request"
import { Message, NewMessage } from "App/messages/reducers"
import { AddNewMessageError } from "App/messages/errors"
import { loadThreads } from "App/messages/actions/load-threads.action"
import { LoadMessagesById } from "App/messages/actions/load-messages-by-id.action"

export const addNewMessage = createAsyncThunk<Message, NewMessage>(
  MessagesEvent.AddNewMessage,
  async (newMessage, { dispatch, rejectWithValue }) => {
    const { data, error } = await addMessage(newMessage)

    if (error || !data) {
      return rejectWithValue(new AddNewMessageError(""))
    }

    await dispatch(
      loadThreads({
        limit: 5,
        offset: 0,
      })
    )
    dispatch(LoadMessagesById(data.threadId))

    return data
  }
)

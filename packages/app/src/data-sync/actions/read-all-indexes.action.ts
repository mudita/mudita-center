/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DataSyncEvent, DataIndex } from "App/data-sync/constants"
import { getIndexRequest } from "App/data-sync/requests"
import { ContactObject, MessageObject, ThreadObject } from "App/data-sync/types"
import { AllIndexes } from "App/data-sync/types/all-indexes.type"
import { ReadAllIndexesError } from "App/data-sync/errors"

export const readAllIndexes = createAsyncThunk<AllIndexes, void>(
  DataSyncEvent.ReadAllIndexes,
  async (_, { rejectWithValue }) => {
    const contacts = await getIndexRequest<ContactObject>(DataIndex.Contact)
    const messages = await getIndexRequest<MessageObject>(DataIndex.Message)
    const threads = await getIndexRequest<ThreadObject>(DataIndex.Thread)

    if (
      contacts === undefined ||
      messages === undefined ||
      threads === undefined
    ) {
      return rejectWithValue(new ReadAllIndexesError("Read All Indexes fails"))
    }

    return {
      contacts: contacts.documentStore.docs,
      messages: messages.documentStore.docs,
      threads: threads.documentStore.docs,
    }
  }
)

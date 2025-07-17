/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "Core/core/errors"
import {
  DataIndex,
  DataSyncError,
  DataSyncEvent,
} from "Core/data-sync/constants"
import { getIndexRequest } from "Core/data-sync/requests"
import { AllIndexes } from "Core/data-sync/types/all-indexes.type"

export const readAllIndexes = createAsyncThunk<AllIndexes, void>(
  DataSyncEvent.ReadAllIndexes,
  async (_, { rejectWithValue }) => {
    const contacts = await getIndexRequest(DataIndex.Contact)
    const messages = await getIndexRequest(DataIndex.Message)
    const templates = await getIndexRequest(DataIndex.Template)
    const threads = await getIndexRequest(DataIndex.Thread)
    const callLog = await getIndexRequest(DataIndex.CallLog)
    const alarms = await getIndexRequest(DataIndex.Alarm)
    const notes = await getIndexRequest(DataIndex.Note)
    const quotations = await getIndexRequest(DataIndex.Quotations)

    if (
      contacts === undefined ||
      messages === undefined ||
      templates === undefined ||
      threads === undefined ||
      callLog === undefined ||
      alarms === undefined ||
      notes === undefined
    ) {
      return rejectWithValue(
        new AppError(DataSyncError.ReadAllIndexes, "Read All Indexes fails")
      )
    }

    return {
      contacts: contacts.documentStore.docs,
      messages: messages.documentStore.docs,
      templates: templates.documentStore.docs,
      threads: threads.documentStore.docs,
      callLog: callLog.documentStore.docs,
      alarms: alarms.documentStore.docs,
      notes: notes.documentStore.docs,
      quotations: quotations?.documentStore.docs,
    }
  }
)

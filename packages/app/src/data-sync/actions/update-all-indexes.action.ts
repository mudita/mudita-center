/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DataSyncEvent, DataIndex } from "App/data-sync/constants"
import { getIndexRequest, indexAllRequest } from "App/data-sync/requests"
import { ContactObject } from "App/data-sync/types"
import { AllIndexes } from "App/data-sync/types/all-indexes.type"
import { UpdateAllIndexesError } from "App/data-sync/errors"

export const updateAllIndexes = createAsyncThunk<AllIndexes, void>(
  DataSyncEvent.UpdateAllIndexes,
  async (_, { rejectWithValue }) => {
    await indexAllRequest()
    const contacts = await getIndexRequest<ContactObject>(DataIndex.Contact)

    if (contacts === undefined) {
      return rejectWithValue(
        new UpdateAllIndexesError("Update All Indexes fails")
      )
    }

    return {
      contacts: contacts.documentStore.docs,
    }
  }
)

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DataSyncEvent, DataIndex } from "App/data-sync/constants"
import { getIndexRequest } from "App/data-sync/requests"

export const updateIndex = createAsyncThunk<any>(
  DataSyncEvent.UpdateIndex,
  async () => {
    const contacts = await getIndexRequest(DataIndex.Contact)

    console.log(contacts)

    return {
      contacts: contacts.documentStore.docs,
    }
  }
)

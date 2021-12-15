/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DataSyncEvent, DataIndex } from "App/data-sync/constants"
import { getIndexRequest } from "App/data-sync/requests"

export const getIndex = createAsyncThunk<void, DataIndex>(
  DataSyncEvent.GetIndex,
  async (payload) => {
    try {
      const data = await getIndexRequest(payload)
      console.log("DATA: ", data.documentStore.docs)
    } catch (error) {
      console.log(error)
    }
  }
)

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SearchEvent } from "App/search/constants"
import { SearchParams, SearchResult } from "App/search/dto"
import { searchRequest } from "App/search/requests"

export const search = createAsyncThunk<SearchResult | undefined, SearchParams>(
  SearchEvent.SearchData,
  async (payload) => {
    const result = await searchRequest(payload)
    return result.data
  }
)

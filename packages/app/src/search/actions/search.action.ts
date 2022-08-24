/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SearchEvent } from "App/search/constants"
import { SearchParams, SearchResult } from "App/search/dto"
import { searchRequest } from "App/search/requests"

export const search = createAsyncThunk<SearchResult | undefined, SearchParams>(
  SearchEvent.Search,
  async (payload) => {
    const result = await searchRequest(payload)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result.data
  }
)

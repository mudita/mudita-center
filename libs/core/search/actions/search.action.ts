/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SearchEvent } from "Core/search/constants"
import { SearchParams, SearchResult } from "Core/search/dto"
import { searchRequest } from "Core/search/requests"

const searchActionGenerator = (searchAction: SearchEvent) =>
  createAsyncThunk<SearchResult | undefined, SearchParams>(
    searchAction,
    async (payload) => {
      const result = await searchRequest(payload)
      return result.ok ? result.data : undefined
    }
  )

export const search = searchActionGenerator(SearchEvent.SearchData)
export const searchPreview = searchActionGenerator(
  SearchEvent.SearchDataPreview
)

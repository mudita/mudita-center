/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { NewsEvent } from "Core/news/constants"
import { NewsState, SetNewsAction } from "Core/news/reducers/news.interface"
import { normalizeNewsEntries } from "Core/news/reducers/news.helper"

export const initialState: NewsState = {
  newsItems: [],
}

export const newsReducer = createReducer<NewsState>(initialState, (builder) => {
  builder.addCase(NewsEvent.SetNews, (state, action: SetNewsAction) => {
    const newsItems = action.payload
    const normalized = normalizeNewsEntries(newsItems)
    return {
      ...state,
      newsItems: normalized,
    }
  })
})

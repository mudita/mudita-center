/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { NewsEvent } from "App/news/constants"
import { NewsState, SetNewsAction } from "App/news/reducers/news.interface"

export const initialState: NewsState = {
  newsItems: [],
}

export const newsReducer = createReducer<NewsState>(initialState, (builder) => {
  builder.addCase(NewsEvent.SetNews, (state, action: SetNewsAction) => {
    return {
      ...state,
      newsItems: action.payload,
    }
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { setNews } from "./news.actions"
import { NewsReducer } from "news/models"

const initialState: NewsReducer = {
  items: [],
}

export const newsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setNews, (state, action) => {
    state.items = action.payload.items
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { setArticleRated, setHelpData } from "./help.actions"
import { HelpReducer } from "help/models"
import { uniq } from "lodash"

const initialState: HelpReducer = {
  data: {
    categories: {},
    subcategories: {},
    articles: {},
    assets: {},
    shortcuts: {},
  },
  ratedArticles: [],
}

export const helpReducer = createReducer(initialState, (builder) => {
  builder.addCase(setHelpData.fulfilled, (state, action) => {
    state.data = action.payload
  })
  builder.addCase(setArticleRated, (state, { payload }) => {
    state.ratedArticles = uniq([...state.ratedArticles, payload])
  })
})

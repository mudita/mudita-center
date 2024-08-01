/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { HelpData } from "help/models"
import { rateArticle, setHelpData } from "./actions"
import { uniq } from "lodash"

interface HelpState {
  data: Omit<HelpData, "nextSyncToken">
  ratedArticles: string[]
}

const initialState: HelpState = {
  data: {
    categories: {},
    subcategories: {},
    articles: {},
    assets: {},
  },
  ratedArticles: [],
}

export const helpReducer = createReducer(initialState, (builder) => {
  builder.addCase(setHelpData.fulfilled, (state, { payload }) => {
    state.data = payload
  })
  builder.addCase(rateArticle.fulfilled, (state, { payload }) => {
    state.ratedArticles = uniq([...state.ratedArticles, payload])
  })
})

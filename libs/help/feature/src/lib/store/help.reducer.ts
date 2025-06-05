/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { rateArticle, setHelpData } from "./help.actions"
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
  builder.addCase(setHelpData, (state, { payload }) => {
    state.data = payload
  })
  builder.addCase(rateArticle.fulfilled, (state, { payload }) => {
    state.ratedArticles = uniq([...state.ratedArticles, payload])
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { setHelpData } from "./help.actions"
import { HelpReducer } from "help/models"

const initialState: HelpReducer = {
  data: {
    categories: {},
    subcategories: {},
    articles: {},
    assets: {},
    shortcuts: {},
  },
}

export const helpReducer = createReducer(initialState, (builder) => {
  builder.addCase(setHelpData, (state, action) => {
    state.data = {
      categories: action.payload.categories,
      subcategories: action.payload.subcategories,
      articles: action.payload.articles,
      assets: action.payload.assets,
      shortcuts: action.payload.shortcuts,
    }
  })
})

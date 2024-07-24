/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { HelpData } from "help/models"
import { setHelpData } from "./actions"

interface HelpState {
  data: HelpData
}

const initialState: HelpState = {
  data: {
    categories: {},
    subcategories: {},
    articles: {},
    assets: {},
    lastUpdate: "",
  },
}

export const helpReducer = createReducer(initialState, (builder) => {
  builder.addCase(setHelpData.fulfilled, (state, { payload }) => {
    state.data = payload
  })
})

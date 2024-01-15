/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { MenuElement } from "Core/__deprecated__/renderer/constants/menu-elements"
import { View } from "generic-view/utils"
import { getAPIConfig } from "./get-api-config"
import { setMenu, setViewData, setViewLayout } from "./actions"
import { getOverviewData } from "./features"
import { getOverviewConfig } from "./features/get-overview-config.actions"

interface GenericState {
  menu: MenuElement[] | undefined
  views: Record<
    string,
    {
      layout: View
      data: Record<string, unknown>
    }
  >
  lastResponse: unknown
}

const initialState: GenericState = {
  menu: undefined,
  views: {},
  lastResponse: {},
}

export const genericViewsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setMenu, (state, action) => {
    state.menu = action.payload
  })
  builder.addCase(setViewLayout, (state, action) => {
    state.views[action.payload.feature] = {
      ...state.views[action.payload.feature],
      layout: action.payload.layout,
    }
  })
  builder.addCase(setViewData, (state, action) => {
    state.views[action.payload.feature] = {
      ...state.views[action.payload.feature],
      data: action.payload.data,
    }
  })
  builder.addCase(getAPIConfig.fulfilled, (state, action) => {
    state.lastResponse = action.payload
  })
  builder.addCase(getOverviewData.fulfilled, (state, action) => {
    state.lastResponse = action.payload
  })
  builder.addCase(getOverviewConfig.fulfilled, (state, action) => {
    state.lastResponse = action.payload
  })
})

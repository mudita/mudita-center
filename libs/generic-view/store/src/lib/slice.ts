/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MenuElement } from "Core/__deprecated__/renderer/constants/menu-elements"
import { View } from "generic-view/utils"
import { getAPIConfig } from "device/feature"

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

export const genericViewsSlice = createSlice({
  name: "generic-views",
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<MenuElement[]>) => {
      state.menu = action.payload
    },
    setViewLayout: (state, action) => {
      state.views[action.payload.feature] = {
        ...state.views[action.payload.feature],
        layout: action.payload.layout,
      }
    },
    setViewData: (state, action) => {
      state.views[action.payload.feature] = {
        ...state.views[action.payload.feature],
        data: action.payload.data,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAPIConfig.fulfilled, (state, action) => {
      state.lastResponse = action.payload
    })
  },
})

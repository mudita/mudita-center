/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MenuElement } from "App/__deprecated__/renderer/constants/menu-elements"
import { View } from "App/api-demo/models/api-views.types"
import { getAPIConfig } from "App/api-demo/store/actions/get-api-config.action"

interface GenericState {
  menu: MenuElement[] | undefined
  views: Record<
    string,
    {
      layout: View
      data: Record<string, unknown>
    }
  >
  lastResponse: any
}

const initialState: GenericState = {
  menu: undefined,
  views: {},
  lastResponse: {},
}

export const genericSlice = createSlice({
  name: "generic-view",
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

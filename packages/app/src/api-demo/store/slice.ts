/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MenuElement } from "App/__deprecated__/renderer/constants/menu-elements"
import { View } from "../models/api-views.types"

interface GenericState {
  menu: MenuElement[] | undefined
  views: Record<
    string,
    {
      layout: View
      data: View | undefined
    }
  >
}

const initialState: GenericState = {
  menu: undefined,
  views: {},
}

export const genericSlice = createSlice({
  name: "generic-view",
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<MenuElement[]>) => {
      state.menu = action.payload
    },
    setViews: (state, action: PayloadAction<string[]>) => {
      state.views = action.payload.reduce((acc, feature) => {
        return {
          ...acc,
          [feature]: {
            layout: undefined,
            data: undefined,
          },
        }
      }, {})
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
})

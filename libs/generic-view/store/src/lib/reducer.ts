/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { MenuElement } from "Core/__deprecated__/renderer/constants/menu-elements"
import { View } from "generic-view/utils"
import { getAPIConfig } from "./get-api-config"
import { activateDevice, setMenu, setViewData, setViewLayout } from "./actions"
import { getOverviewData } from "./features"
import { getOverviewConfig } from "./features/get-overview-config.actions"
import { getAPIAny } from "./get-api-any"
import { ApiConfig, MenuConfig } from "device/models"
import { getMenuConfig } from "./get-menu-config"
import { DeviceId } from "Core/device/constants/device-id"

interface DeviceConfiguration {
  apiConfig: ApiConfig
  menuConfig?: MenuConfig
}

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
  activeDevice?: DeviceId
  devicesConfiguration: Record<string, DeviceConfiguration>
}

const initialState: GenericState = {
  menu: undefined,
  views: {},
  lastResponse: {},
  devicesConfiguration: {},
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
    state.devicesConfiguration[action.payload.deviceId] = {
      apiConfig: action.payload.apiConfig,
    }
    state.lastResponse = action.payload
  })
  builder.addCase(getMenuConfig.fulfilled, (state, action) => {
    state.devicesConfiguration[action.payload.deviceId].menuConfig =
      action.payload.menuConfig
    state.lastResponse = action.payload
  })
  builder.addCase(getAPIAny.fulfilled, (state, action) => {
    state.lastResponse = action.payload
  })
  builder.addCase(getOverviewData.fulfilled, (state, action) => {
    state.lastResponse = action.payload
  })
  builder.addCase(getOverviewConfig.fulfilled, (state, action) => {
    state.lastResponse = action.payload
  })
  builder.addCase(activateDevice, (state, action) => {
    if (state.devicesConfiguration[action.payload.deviceId].apiConfig) {
      state.activeDevice = action.payload.deviceId
    }
  })
})

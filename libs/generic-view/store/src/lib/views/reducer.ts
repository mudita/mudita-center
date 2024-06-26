/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { MenuElement } from "Core/__deprecated__/renderer/constants/menu-elements"
import { View } from "generic-view/utils"
import { DeviceState } from "device-manager/models"
import { Device, Features } from "generic-view/models"
import { ApiError } from "device/models"
import { AppError } from "Core/core/errors"
import { getAPIConfig } from "../get-api-config"
import { getOverviewData } from "../features"
import { getOverviewConfig } from "../features/get-overview-config.actions"
import { getAPIAny } from "../get-api-any"
import { getMenuConfig } from "../get-menu-config"
import { getOutboxData } from "../outbox/get-outbox-data.action"
import { getGenericConfig } from "../features/get-generic-config.actions"
import {
  addDevice,
  removeDevice, setLastRefresh,
  setMenu,
  setViewData,
  setViewLayout,
} from "./actions"

export interface GenericState {
  menu: MenuElement[] | undefined
  views: Record<
    string,
    {
      layout: View
      data: Record<string, unknown>
    }
  >
  lastResponse: unknown
  lastRefresh?: number
  devices: Record<string, Device>
  apiErrors: Record<ApiError, boolean>
}

const initialState: GenericState = {
  menu: undefined,
  views: {},
  lastResponse: {},
  devices: {},
  apiErrors: {
    [ApiError.DeviceLocked]: false,
  },
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
  builder.addCase(addDevice, (state, action) => {
    state.devices[action.payload.id] = {
      ...action.payload,
      state: DeviceState.Connected,
    }
  })
  builder.addCase(getAPIConfig.fulfilled, (state, action) => {
    const device = state.devices[action.payload.deviceId]

    state.devices[action.payload.deviceId] = {
      ...device,
      state: DeviceState.Configured,
      apiConfig: action.payload.apiConfig,
    }
    state.lastResponse = action.payload
  })
  builder.addCase(getAPIConfig.rejected, (state, action) => {
    const id = action.meta.arg.deviceId
    const device = state.devices[id]

    state.devices[id] = {
      ...device,
      state: DeviceState.Failed,
    }

    state.lastResponse = action.payload
  })
  builder.addCase(getMenuConfig.fulfilled, (state, action) => {
    state.devices[action.payload.deviceId].menuConfig =
      action.payload.menuConfig
    state.lastResponse = action.payload
    state.apiErrors[ApiError.DeviceLocked] = false
  })
  builder.addCase(getMenuConfig.rejected, (state, action) => {
    const error = action.payload as AppError
    const apiError = !isNaN(Number(error.type))
      ? (Number(error.type) as ApiError)
      : undefined
    if (apiError && ApiError[apiError]) {
      state.apiErrors[apiError] = true
    }
  })
  builder.addCase(getAPIAny.fulfilled, (state, action) => {
    state.lastResponse = action.payload
  })
  builder.addCase(getOverviewData.fulfilled, (state, action) => {
    state.lastResponse = action.payload
    const deviceId = action.payload.deviceId
    state.devices[deviceId].features = {
      ...state.devices[deviceId].features,
      "mc-overview": {
        config: state.devices[deviceId].features?.["mc-overview"]?.config,
        data: action.payload.overviewData,
      },
      ...(action.payload.aboutData
        ? {
            "mc-about": {
              config: state.devices[deviceId].features?.["mc-about"]?.config,
              data: action.payload.aboutData,
            },
          }
        : {}),
    }
  })
  builder.addCase(getOverviewConfig.fulfilled, (state, action) => {
    state.lastResponse = action.payload
    const deviceId = action.payload.deviceId
    state.devices[deviceId].features = {
      ...state.devices[deviceId].features,
      "mc-overview": {
        config: action.payload.overviewConfig,
        data: state.devices[deviceId].features?.["mc-overview"]?.data,
      },
      ...(action.payload.aboutConfig
        ? {
            "mc-about": {
              config: action.payload.aboutConfig,
              data: state.devices[deviceId].features?.["mc-about"]?.data,
            },
          }
        : {}),
    } as Features
  })
  builder.addCase(removeDevice, (state, action) => {
    delete state.devices[action.payload.id]
  })
  builder.addCase(setLastRefresh, (state, action) => {
    state.lastRefresh = action.payload
  })
  builder.addCase(getOutboxData.fulfilled, (state, action) => {
    state.apiErrors[ApiError.DeviceLocked] = false
  })
  builder.addCase(getGenericConfig.fulfilled, (state, action) => {
    const { deviceId, feature, view } = action.payload
    state.devices[deviceId].features = {
      ...state.devices[deviceId].features,
      [feature]: {
        config: view,
        data: state.devices[deviceId].features?.[feature]?.data,
      },
    }
  })
})

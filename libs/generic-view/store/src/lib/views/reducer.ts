/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { MenuElement } from "Core/__deprecated__/renderer/constants/menu-elements"
import { View } from "generic-view/utils"
import { getAPIConfig } from "../get-api-config"
import {
  activateDevice,
  detachDevice,
  setMenu,
  setViewData,
  setViewLayout,
} from "./actions"
import { getOverviewData } from "../features"
import { getOverviewConfig } from "../features/get-overview-config.actions"
import { getAPIAny } from "../get-api-any"
import { ApiConfig, ApiError, MenuConfig, OverviewData } from "device/models"
import { getMenuConfig } from "../get-menu-config"
import { DeviceId } from "Core/device/constants/device-id"
import { getOutboxData } from "../outbox/get-outbox-data.action"
import { AppError } from "Core/core/errors"

interface DeviceConfiguration {
  apiConfig: ApiConfig
  menuConfig?: MenuConfig
  features?: {
    "mc-overview"?: {
      config?: View
      data?: OverviewData
    }
    "mc-about"?: {
      config?: View
      data?: OverviewData
    }
  }
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
  lastRefresh?: number
  activeDevice?: DeviceId
  devicesConfiguration: Record<string, DeviceConfiguration>
  apiErrors: Record<ApiError, boolean>
}

const initialState: GenericState = {
  menu: undefined,
  views: {},
  lastResponse: {},
  devicesConfiguration: {},
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
    if (deviceId) {
      state.devicesConfiguration[deviceId].features = {
        ...state.devicesConfiguration[deviceId].features,
        "mc-overview": {
          config:
            state.devicesConfiguration[deviceId].features?.["mc-overview"]
              ?.config,
          data: action.payload.overviewData,
        },
        ...(action.payload.aboutData
          ? {
              "mc-about": {
                config:
                  state.devicesConfiguration[deviceId].features?.["mc-about"]
                    ?.config,
                data: action.payload.aboutData,
              },
            }
          : {}),
      }
    }
  })
  builder.addCase(getOverviewConfig.fulfilled, (state, action) => {
    state.lastResponse = action.payload
    const deviceId = action.payload.deviceId
    if (deviceId) {
      state.devicesConfiguration[deviceId].features = {
        ...state.devicesConfiguration[deviceId].features,
        "mc-overview": {
          config: action.payload.overviewConfig,
          data: state.devicesConfiguration[deviceId].features?.["mc-overview"]
            ?.data,
        },
        ...(action.payload.aboutConfig
          ? {
              "mc-about": {
                config: action.payload.aboutConfig,
                data: state.devicesConfiguration[deviceId].features?.[
                  "mc-about"
                ]?.data,
              },
            }
          : {}),
      }
    }
  })
  builder.addCase(activateDevice, (state, action) => {
    const { deviceId } = action.payload
    state.activeDevice = state.devicesConfiguration?.[deviceId]?.apiConfig
      ? deviceId
      : undefined
  })
  builder.addCase(detachDevice, (state, action) => {
    const { deviceId } = action.payload
    if (state.devicesConfiguration[deviceId]?.apiConfig) {
      delete state.devicesConfiguration[deviceId]
    }
    if (state.activeDevice === deviceId) {
      state.activeDevice = undefined
    }
  })
  builder.addCase(getOutboxData.fulfilled, (state, action) => {
    const { deviceId, timestamp } = action.payload
    if (state.activeDevice === deviceId) {
      state.lastRefresh = timestamp
    }
    state.apiErrors[ApiError.DeviceLocked] = false
  })
  builder.addCase(getOutboxData.rejected, (state, action) => {
    const { deviceId, timestamp } = action.payload as {
      deviceId: DeviceId
      timestamp: number
    }
    if (state.activeDevice === deviceId) {
      state.lastRefresh = timestamp
    }
  })
})

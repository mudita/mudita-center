/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { MenuElement } from "Core/__deprecated__/renderer/constants/menu-elements"
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
  removeDevice,
  setDeviceState,
  setGenericConfig,
  setLastRefresh,
  setMenu,
} from "./actions"
import { transformGenericComponents } from "../features/transform-generic-components"

export interface GenericState {
  menu: MenuElement[] | undefined
  lastResponse: unknown
  lastRefresh?: number
  devices: Record<string, Device>
  apiErrors: Record<string, Record<ApiError, boolean>>
}

const initialState: GenericState = {
  menu: undefined,
  lastResponse: {},
  devices: {},
  apiErrors: {},
}

export const genericViewsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setMenu, (state, action) => {
    state.menu = action.payload
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
    state.apiErrors[action.payload.deviceId] = {
      [ApiError.DeviceLocked]: false,
    }
  })
  builder.addCase(getMenuConfig.rejected, (state, action) => {
    const error = action.payload as AppError
    const apiError = !isNaN(Number(error.type))
      ? (Number(error.type) as ApiError)
      : undefined
    if (apiError && ApiError[apiError]) {
      state.apiErrors[action.meta.arg.deviceId] = {
        [apiError]: true,
      }
    }

    if (apiError !== ApiError.DeviceLocked) {
      const id = action.meta.arg.deviceId
      const device = state.devices[id]

      state.devices[id] = {
        ...device,
        state: DeviceState.Failed,
      }
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
    state.apiErrors[action.payload.deviceId] = {
      [ApiError.DeviceLocked]: false,
    }
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
  builder.addCase(setDeviceState, (state, action) => {
    if (action.payload) {
      const id = action.payload.id
      const device = state.devices[id]
      const deviceState = action.payload.state
      state.devices[id] = {
        ...device,
        state: deviceState,
      }
    }
  })
  // Helper action for setting custom generic config without a need of reloading the app
  builder.addCase(setGenericConfig, (state, action) => {
    const { deviceId, feature, config } = action.payload
    if (state.devices[deviceId] !== undefined) {
      state.devices[deviceId].features = {
        ...state.devices[deviceId].features,
        [feature]: {
          ...state.devices[deviceId].features?.[feature],
          config: transformGenericComponents({
            ...state.devices[deviceId].features?.[feature].config,
            ...config,
          }),
          data: state.devices[deviceId].features?.[feature]?.data,
        },
      }
    }
  })
})

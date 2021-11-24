/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  GlobalModalsManagerState,
  ToggleAllModalsShowBlockedAction,
  ToggleCollectingDataModalShow,
} from "App/global-modals-manager/reducers/global-modals-manager.interface"
import { GlobalModalsManagerEvent } from "App/global-modals-manager/constants"

export const initialState: GlobalModalsManagerState = {
  allModalsShowBlocked: false,
  collectingDataModalShow: false,
}

export const globalModalsManagerReducer =
  createReducer<GlobalModalsManagerState>(initialState, (builder) => {
    builder
      .addCase(
        GlobalModalsManagerEvent.ToggleAllModalsShowBlocked,
        (state, action: ToggleAllModalsShowBlockedAction) => {
          return {
            ...state,
            allModalsShowBlocked: action.payload,
          }
        }
      )
      .addCase(
        GlobalModalsManagerEvent.ToggleCollectingDataModalShow,
        (state, action: ToggleCollectingDataModalShow) => {
          return {
            ...state,
            collectingDataModalShow: action.payload,
          }
        }
      )
  })

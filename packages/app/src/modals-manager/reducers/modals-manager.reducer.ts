/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  ModalsManagerState,
  ToggleAllModalsShowBlockedAction,
  ToggleCollectingDataModalShow,
} from "App/modals-manager/reducers/modals-manager.interface"
import { ModalsManagerEvent } from "App/modals-manager/constants"

export const initialState: ModalsManagerState = {
  allModalsShowBlocked: false,
  collectingDataModalShow: false,
}

export const modalsManagerReducer =
  createReducer<ModalsManagerState>(initialState, (builder) => {
    builder
      .addCase(
        ModalsManagerEvent.ToggleAllModalsShowBlocked,
        (state, action: ToggleAllModalsShowBlockedAction) => {
          return {
            ...state,
            allModalsShowBlocked: action.payload,
          }
        }
      )
      .addCase(
        ModalsManagerEvent.ToggleCollectingDataModalShow,
        (state, action: ToggleCollectingDataModalShow) => {
          return {
            ...state,
            collectingDataModalShow: action.payload,
          }
        }
      )
  })

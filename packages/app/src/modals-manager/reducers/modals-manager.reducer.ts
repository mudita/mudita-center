/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  ModalsManagerState,
  ToggleCollectingDataModalShow,
} from "App/modals-manager/reducers/modals-manager.interface"
import { ModalsManagerEvent } from "App/modals-manager/constants"

export const initialState: ModalsManagerState = {
  collectingDataModalShow: false,
}

export const modalsManagerReducer = createReducer<ModalsManagerState>(
  initialState,
  (builder) => {
    builder
      .addCase(ModalsManagerEvent.HideModals, () => {
        return {
          ...initialState,
        }
      })
      .addCase(
        ModalsManagerEvent.ToggleCollectingDataModalShow,
        (state, action: ToggleCollectingDataModalShow) => {
          return {
            ...state,
            collectingDataModalShow: action.payload,
          }
        }
      )
  }
)

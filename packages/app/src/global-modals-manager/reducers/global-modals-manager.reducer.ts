/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  GlobalModalsManagerState,
  SetAllModalsShowBlockedAction,
} from "App/global-modals-manager/reducers/global-modals-manager.interface"
import { GlobalModalsManagerEvent } from "App/global-modals-manager/constants"

export const initialState: GlobalModalsManagerState = {
  allModalsShowBlocked: false,
}

export const globalModalsManagerReducer =
  createReducer<GlobalModalsManagerState>(initialState, (builder) => {
    builder.addCase(
      GlobalModalsManagerEvent.SetAllModalsShowBlocked,
      (state, action: SetAllModalsShowBlockedAction) => {
        return {
          ...state,
          allModalsShowBlocked: action.payload,
        }
      }
    )
  })

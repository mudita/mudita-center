/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  ModalsManagerState,
  SetModalsStateAction,
} from "App/modals-manager/reducers/modals-manager.interface"
import { ModalsManagerEvent } from "App/modals-manager/constants"

export const initialState: ModalsManagerState = {
  collectingDataModalShow: false,
}

export const modalsManagerReducer = createReducer<ModalsManagerState>(
  initialState,
  (builder) => {
    builder.addCase(
      ModalsManagerEvent.SetModalsState,
      (state, action: SetModalsStateAction) => {
        return {
          ...state,
          ...action.payload,
        }
      }
    )
  }
)

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  ModalsManagerState,
  ModalStateKey,
  ShowModalAction,
} from "App/modals-manager/reducers/modals-manager.interface"
import { ModalsManagerEvent } from "App/modals-manager/constants"

const initialModalsState: Record<ModalStateKey, boolean> = {
  collectingDataModalShow: false,
  appForcedUpdateFlowShow: false,
  appUpdateFlowShow: false,
  contactSupportFlowShow: false,
}

export const initialState: ModalsManagerState = {
  ...initialModalsState,
}

export const modalsManagerReducer = createReducer<ModalsManagerState>(
  initialState,
  (builder) => {
    builder
      .addCase(ModalsManagerEvent.HideModals, (state) => {
        return {
          ...state,
          ...initialModalsState,
        }
      })
      .addCase(
        ModalsManagerEvent.ShowModal,
        (state, action: ShowModalAction) => {
          return {
            ...state,
            ...initialModalsState,
            [action.payload]: true,
          }
        }
      )
  }
)

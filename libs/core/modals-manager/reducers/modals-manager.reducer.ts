/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  ModalsManagerState,
  ModalStateKey,
  ShowModalAction,
} from "Core/modals-manager/reducers/modals-manager.interface"
import { ModalsManagerEvent } from "Core/modals-manager/constants"

const initialModalsState: Record<ModalStateKey, boolean> = {
  appForcedUpdateFlowShow: false,
  appUpdateFlowShow: false,
  contactSupportFlowShow: false,
  deviceInitializationFailedModalShow: false,
  appRunWithSudoShow: false,
  usbAccessFlowShow: false,
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

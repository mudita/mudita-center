/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  ModalKey,
  ModalsManagerState,
  ShowModalAction,
} from "App/modals-manager/reducers/modals-manager.interface"
import { ModalsManagerEvent } from "App/modals-manager/constants"

export const initialState: ModalsManagerState = {
  collectingDataModalShow: false,
  appForcedUpdateFlowShow: false,
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
        ModalsManagerEvent.ShowModal,
        (state, action: ShowModalAction) => {
          if (action.payload === ModalKey.CollectingDataModal) {
            return {
              ...initialState,
              collectingDataModalShow: true,
            }
          }

          else if (
            !state.collectingDataModalShow &&
            action.payload === ModalKey.ForcedUpdateFlow
          ) {
            return {
              ...initialState,
              appForcedUpdateFlowShow: true,
            }
          }

          return state
        }
      )
  }
)

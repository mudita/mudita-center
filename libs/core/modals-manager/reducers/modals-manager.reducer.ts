/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  ModalsManagerState,
  ModalStateKey,
} from "Core/modals-manager/reducers/modals-manager.interface"
import { hideModals, showModal } from "Core/modals-manager/actions/base.action"

const initialModalsState: Record<ModalStateKey, boolean> = {
  appForcedUpdateFlowShow: false,
  appUpdateFlowShow: false,
  contactSupportFlowShow: false,
  deviceInitializationFailedModalShow: false,
  usbAccessFlowShow: false,
}

export const initialState: ModalsManagerState = {
  ...initialModalsState,
}

export const modalsManagerReducer = createReducer<ModalsManagerState>(
  initialState,
  (builder) => {
    builder
      .addCase(hideModals, (state) => {
        return {
          ...state,
          ...initialModalsState,
        }
      })
      .addCase(showModal, (state, action) => {
        return {
          ...state,
          ...initialModalsState,
          [action.payload]: true,
        }
      })
  }
)

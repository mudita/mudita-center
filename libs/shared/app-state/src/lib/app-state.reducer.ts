/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { updateOnlineStatus } from "./online-status/base.action"
import { updateDialogOpenStatus } from "./dialog-open-status/base.action"

export interface AppState {
  dialogOpen: boolean
  online: boolean
}

const initialState: AppState = {
  dialogOpen: false,
  online: false,
}

export const appStateReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateOnlineStatus, (state, action) => {
    state.online = action.payload
  })
  builder.addCase(updateDialogOpenStatus, (state, action) => {
    state.dialogOpen = action.payload
  })
})

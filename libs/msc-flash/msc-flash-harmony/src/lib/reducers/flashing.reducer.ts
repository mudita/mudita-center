/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { FlashingState } from "./flashing.interface"
import { getMscFlashingFilesDetails, setFlashingProcessState } from "../actions"
import { FlashingProcessState } from "../constants"

const initialState: FlashingState = {
  processState: FlashingProcessState.Idle,
  mscFlashingFilesDetails: undefined,
  error: undefined,
}

export const flashingReducer = createReducer<FlashingState>(
  initialState,
  (builder) => {
    builder
      .addCase(getMscFlashingFilesDetails.fulfilled, (state, action) => {
        state.mscFlashingFilesDetails = action.payload
      })
      .addCase(setFlashingProcessState, (state, action) => {
        state.processState = action.payload
      })
  }
)

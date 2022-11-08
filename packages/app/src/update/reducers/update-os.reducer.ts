/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import { SetUpdateStateAction, startUpdateOs } from "App/update/actions"
import { UpdateOsEvent } from "App/update/constants"
import { UpdateOsState } from "App/update/reducers/update-os.interface"

export const initialState: UpdateOsState = {
  updatingState: null,
  error: null,
}

export const updateOsReducer = createReducer<UpdateOsState>(
  initialState,
  (builder) => {
    builder.addCase(
      UpdateOsEvent.SetUpdateState,
      (state, action: SetUpdateStateAction) => {
        return {
          ...state,
          updatingState: action.payload,
        }
      }
    )

    builder.addCase(startUpdateOs.pending, (state) => {
      state.updatingState = State.Loading
    })
    builder.addCase(startUpdateOs.fulfilled, (state) => {
      state.updatingState = State.Loaded
      state.error = null
    })
    builder.addCase(startUpdateOs.rejected, (state, action) => {
      state.updatingState = State.Failed
      state.error = action.payload as AppError
    })
  }
)

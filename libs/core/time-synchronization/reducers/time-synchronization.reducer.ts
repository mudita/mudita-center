/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  setTimeSynchronizationAbortController,
  synchronizeTime,
} from "../actions/synchronize-time.action"
import { resetTimeSynchronizationStatus } from "../actions/reset-time-synchronization-status"

interface TimeSynchronizationState {
  status?: "idle" | "loading" | "success" | "error"
  time?: Date // TODO: add support for displaying the time when available
  abortController?: AbortController
}

export const initialState: TimeSynchronizationState = {
  status: "idle",
}

export const timeSynchronizationReducer =
  createReducer<TimeSynchronizationState>(initialState, (builder) => {
    builder.addCase(synchronizeTime.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(synchronizeTime.fulfilled, (state) => {
      state.status = "success"
    })
    builder.addCase(synchronizeTime.rejected, (state, action) => {
      console.log(action.meta)
      state.status = "error"
    })
    builder.addCase(resetTimeSynchronizationStatus, (state) => {
      state.status = "idle"
      state.abortController = undefined
    })
    builder.addCase(setTimeSynchronizationAbortController, (state, action) => {
      state.abortController = action.payload
    })
  })

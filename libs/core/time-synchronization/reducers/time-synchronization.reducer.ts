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
import { getTime } from "Core/time-synchronization/actions/get-time.action"

interface TimeSynchronizationState {
  status?: "idle" | "loading" | "success" | "error"
  time?: Date
  abortController?: AbortController
}

export const initialState: TimeSynchronizationState = {}

export const timeSynchronizationReducer =
  createReducer<TimeSynchronizationState>(initialState, (builder) => {
    builder.addCase(getTime.fulfilled, (state, action) => {
      state.time = action.payload
    })
    builder.addCase(getTime.rejected, (state) => {
      delete state.time
      delete state.status
      delete state.abortController
    })
    builder.addCase(synchronizeTime.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(synchronizeTime.fulfilled, (state) => {
      state.status = "success"
    })
    builder.addCase(synchronizeTime.rejected, (state, action) => {
      state.status = "error"
    })
    builder.addCase(resetTimeSynchronizationStatus, (state) => {
      state.status = "idle"
      delete state.abortController
    })
    builder.addCase(setTimeSynchronizationAbortController, (state, action) => {
      state.abortController = action.payload
    })
  })

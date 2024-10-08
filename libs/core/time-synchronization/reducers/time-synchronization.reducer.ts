/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { synchronizeTime } from "Core/time-synchronization/actions/synchronize-time.action"
import { resetTimeSynchronizationStatus } from "Core/time-synchronization/actions/reset-time-synchronization-status"

interface TimeSynchronizationState {
  status?: "idle" | "loading" | "success" | "error"
  time?: Date
  abortController?: AbortController
}

export const initialState: TimeSynchronizationState = {
  status: "idle",
  abortController: new AbortController(),
}

export const timeSynchronizationReducer =
  createReducer<TimeSynchronizationState>(initialState, (builder) => {
    builder.addCase(synchronizeTime.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(synchronizeTime.fulfilled, (state) => {
      state.status = "success"
      state.abortController = new AbortController()
    })
    builder.addCase(synchronizeTime.rejected, (state) => {
      state.status = "error"
      state.abortController = new AbortController()
    })
    builder.addCase(resetTimeSynchronizationStatus, (state) => {
      state.status = "idle"
    })
  })

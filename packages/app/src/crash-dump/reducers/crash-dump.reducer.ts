/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { State } from "App/core/constants"
import { CrashDumpState } from "App/crash-dump/reducers/crash-dump.interface"
import {
  setCrashDump,
  getCrashDump,
  downloadCrashDump,
  sendCrashDumpData,
  setDownloadedCrashDump,
  resetCrashDump,
} from "App/crash-dump/actions"

export const initialState: CrashDumpState = {
  data: {
    files: [],
    downloadedFiles: [],
  },
  loadingState: State.Initial,
  downloadingState: State.Initial,
  sendingState: State.Initial,
  error: null,
}

export const crashDumpReducer = createReducer<CrashDumpState>(
  initialState,
  (builder) => {
    builder
      .addCase(setCrashDump, (state, action) => {
        state.data.files = action.payload
      })

      .addCase(getCrashDump.pending, (state) => {
        state.loadingState = State.Loading
      })
      .addCase(getCrashDump.fulfilled, (state) => {
        state.loadingState = State.Loaded
      })
      .addCase(getCrashDump.rejected, (state, action) => {
        state.loadingState = State.Failed
        state.error = action.payload as Error
      })

      .addCase(downloadCrashDump.pending, (state) => {
        state.downloadingState = State.Loading
      })
      .addCase(downloadCrashDump.fulfilled, (state) => {
        state.downloadingState = State.Loaded
      })
      .addCase(downloadCrashDump.rejected, (state, action) => {
        state.downloadingState = State.Failed
        state.error = action.payload as Error
      })

      .addCase(setDownloadedCrashDump, (state, action) => {
        state.data.downloadedFiles = action.payload
      })

      .addCase(sendCrashDumpData.pending, (state) => {
        state.sendingState = State.Loading
      })
      .addCase(sendCrashDumpData.fulfilled, (state) => {
        state.sendingState = State.Loaded
      })
      .addCase(sendCrashDumpData.rejected, (state, action) => {
        state.sendingState = State.Failed
        state.error = action.payload as Error
      })

      .addCase(resetCrashDump, (state) => {
        state.data.downloadedFiles = []
        state.data.files = []
        state.loadingState = State.Initial
        state.downloadingState = State.Initial
        state.sendingState = State.Initial
        state.error = null
      })
  }
)

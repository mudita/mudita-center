/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import {
  cancelDownload,
  checkForUpdate,
  clearState,
  downloadUpdate,
  setUpdateState,
  startUpdateOs,
} from "App/update/actions"
import { DownloadState, UpdateError } from "App/update/constants"
import { UpdateOsState } from "App/update/reducers/update-os.interface"

export const initialState: UpdateOsState = {
  checkForUpdateState: State.Initial,
  updateOsState: State.Initial,
  downloadState: DownloadState.Initial,
  silentUpdateCheck: false,
  error: null,
  data: {
    allReleases: null,
    availableReleasesForUpdate: null,
  },
}

export const updateOsReducer = createReducer<UpdateOsState>(
  initialState,
  (builder) => {
    builder.addCase(setUpdateState, (state, action) => {
      return {
        ...state,
        updateOsState: action.payload,
      }
    })
    builder.addCase(clearState, (state) => {
      return {
        ...state,
        batteryState: null,
        error: null,
        checkForUpdateState: State.Initial,
        updateOsState: State.Initial,
        downloadState: DownloadState.Initial,
      }
    })

    builder.addCase(checkForUpdate.pending, (state, payload) => {
      state.error = null
      state.data = {
        allReleases: null,
        availableReleasesForUpdate: null,
      }
      state.silentUpdateCheck = payload.meta.arg.isSilentCheck
      state.checkForUpdateState = State.Loading
    })
    builder.addCase(checkForUpdate.fulfilled, (state, action) => {
      state.checkForUpdateState = State.Loaded
      state.data.availableReleasesForUpdate =
        action.payload.availableReleasesForUpdate
      state.data.allReleases = action.payload.allReleases
    })
    builder.addCase(checkForUpdate.rejected, (state, action) => {
      state.checkForUpdateState = State.Failed
      state.error = action.payload as AppError<UpdateError>
    })

    builder.addCase(downloadUpdate.pending, (state) => {
      state.error = null
      state.checkForUpdateState = State.Initial
      state.downloadState = DownloadState.Loading
    })
    builder.addCase(downloadUpdate.fulfilled, (state) => {
      state.downloadState = DownloadState.Loaded
    })
    builder.addCase(downloadUpdate.rejected, (state, action) => {
      if (action.payload?.type === UpdateError.DownloadCancelledByUser) {
        state.downloadState = DownloadState.Cancelled
      } else {
        state.downloadState = DownloadState.Failed
        state.error = action.payload as AppError<UpdateError>
      }
    })
    builder.addCase(cancelDownload, (state) => {
      state.downloadState = DownloadState.Cancelled
    })

    builder.addCase(startUpdateOs.pending, (state) => {
      state.error = null
      state.downloadState = DownloadState.Initial
      state.updateOsState = State.Loading
    })
    builder.addCase(startUpdateOs.fulfilled, (state) => {
      state.updateOsState = State.Loaded
      state.error = null
    })
    builder.addCase(startUpdateOs.rejected, (state, action) => {
      state.updateOsState = State.Failed
      state.error = action.payload as AppError<UpdateError>
    })
  }
)

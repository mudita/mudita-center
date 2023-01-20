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
  clearStateAndData,
  closeUpdateFlow,
  downloadUpdates,
  setCheckForUpdateState,
  setStateForDownloadedRelease,
  setStateForInstalledRelease,
  setUpdateState,
  startUpdateOs,
} from "App/update/actions"
import { checkForForceUpdateNeed } from "App/update/actions/check-for-force-update-need/check-for-force-update-need.action"

import {
  CheckForUpdateMode,
  DownloadState,
  ReleaseProcessState,
  SilentCheckForUpdateState,
  UpdateError,
} from "App/update/constants"
import { UpdateOsState } from "App/update/reducers/update-os.interface"

export const initialState: UpdateOsState = {
  silentCheckForUpdate: SilentCheckForUpdateState.Initial,
  checkForUpdateState: State.Initial,
  updateOsState: State.Initial,
  downloadState: DownloadState.Initial,
  error: null,
  needsForceUpdate: false,
  data: {
    allReleases: null,
    availableReleasesForUpdate: null,
    downloadedProcessedReleases: null,
    updateProcessedReleases: null,
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
    builder.addCase(setCheckForUpdateState, (state, action) => {
      return {
        ...state,
        checkForUpdateState: action.payload,
      }
    })
    builder.addCase(closeUpdateFlow, (state) => {
      return {
        ...state,
        error: null,
        silentCheckForUpdate:
          state.silentCheckForUpdate === SilentCheckForUpdateState.Failed
            ? SilentCheckForUpdateState.Skipped
            : state.silentCheckForUpdate,
        checkForUpdateState: State.Initial,
        updateOsState: State.Initial,
        downloadState: DownloadState.Initial,
      }
    })
    builder.addCase(clearStateAndData, () => {
      return {
        ...initialState,
      }
    })
    builder.addCase(setStateForDownloadedRelease, (state, action) => {
      const { state: newReleaseState, version } = action.payload
      const newDownloadedProcessedReleases = (
        state.data.downloadedProcessedReleases ?? []
      ).map((item) =>
        item.release.version === version
          ? {
              ...item,
              state: newReleaseState,
            }
          : item
      )

      return {
        ...state,
        data: {
          ...state.data,
          downloadedProcessedReleases: newDownloadedProcessedReleases,
        },
      }
    })
    builder.addCase(setStateForInstalledRelease, (state, action) => {
      const { state: newReleaseState, version } = action.payload
      const newUpdateProcessedReleases = (
        state.data.updateProcessedReleases ?? []
      ).map((item) =>
        item.release.version === version
          ? {
              ...item,
              state: newReleaseState,
            }
          : item
      )

      const newAvailableReleasesForUpdate = (
        state.data.availableReleasesForUpdate ?? []
      ).filter(
        (release) =>
          !(
            release.version === version &&
            newReleaseState === ReleaseProcessState.Done
          )
      )

      return {
        ...state,
        data: {
          ...state.data,
          updateProcessedReleases: newUpdateProcessedReleases,
          availableReleasesForUpdate: newAvailableReleasesForUpdate,
        },
      }
    })

    builder.addCase(checkForUpdate.pending, (state, payload) => {
      state.error = null
      state.data = {
        allReleases: null,
        availableReleasesForUpdate: null,
        downloadedProcessedReleases: null,
        updateProcessedReleases: null,
      }

      const {
        meta: {
          arg: { mode },
        },
      } = payload

      if (mode === CheckForUpdateMode.SilentCheck) {
        state.silentCheckForUpdate = SilentCheckForUpdateState.Loading
        state.checkForUpdateState = State.Initial
      } else if (mode === CheckForUpdateMode.TryAgain) {
        state.silentCheckForUpdate = SilentCheckForUpdateState.Skipped
        state.checkForUpdateState = State.Loading
      } else {
        state.checkForUpdateState = State.Loading
      }
    })
    builder.addCase(checkForUpdate.fulfilled, (state, action) => {
      state.data.availableReleasesForUpdate =
        action.payload.availableReleasesForUpdate
      state.data.allReleases = action.payload.allReleases
      if (action.meta.arg.mode === CheckForUpdateMode.SilentCheck) {
        state.silentCheckForUpdate = SilentCheckForUpdateState.Loaded
      } else {
        state.checkForUpdateState = State.Loaded
      }
      if (action.payload.areAllReleasesAlreadyDownloaded) {
        state.data.downloadedProcessedReleases =
          action.payload.availableReleasesForUpdate.map((release) => ({
            release,
            state: ReleaseProcessState.Done,
          }))
      }
    })
    builder.addCase(checkForUpdate.rejected, (state, action) => {
      if (action.meta.arg.mode === CheckForUpdateMode.SilentCheck) {
        state.silentCheckForUpdate = SilentCheckForUpdateState.Failed
      } else {
        state.checkForUpdateState = State.Failed
      }

      state.error = action.payload as AppError<UpdateError>
    })

    builder.addCase(downloadUpdates.pending, (state, action) => {
      state.data.downloadedProcessedReleases = action.meta.arg.releases.map(
        (release) => ({
          release,
          state: ReleaseProcessState.Initial,
        })
      )
      state.error = null
      state.checkForUpdateState = State.Initial
      state.downloadState = DownloadState.Loading
    })
    builder.addCase(downloadUpdates.fulfilled, (state) => {
      state.downloadState = DownloadState.Loaded
    })
    builder.addCase(downloadUpdates.rejected, (state, action) => {
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

    builder.addCase(startUpdateOs.pending, (state, action) => {
      state.data.updateProcessedReleases = action.meta.arg.releases.map(
        (release) => ({
          release,
          state: ReleaseProcessState.Initial,
        })
      )
      state.error = null
      state.checkForUpdateState = State.Initial
      state.downloadState = DownloadState.Initial
      state.updateOsState = State.Loading
    })
    builder.addCase(startUpdateOs.fulfilled, (state) => {
      state.updateOsState = State.Loaded
      state.data = {
        ...state.data,
        availableReleasesForUpdate: [],
        downloadedProcessedReleases: [],
        updateProcessedReleases: [],
      }
      state.error = null
    })
    builder.addCase(startUpdateOs.rejected, (state, action) => {
      state.updateOsState = State.Failed
      state.error = action.payload as AppError<UpdateError>
    })
    builder.addCase(checkForForceUpdateNeed.fulfilled, (state, action) => {
      state.needsForceUpdate = action.payload
    })
  }
)

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { tryTrackOsDownload } from "App/analytic-data-tracker/helpers/track-os-download"
import { AppError } from "App/core/errors"
import { setStateForDownloadedRelease } from "App/update/actions/base.action"
import {
  OsEnvironment,
  ReleaseProcessState,
  UpdateError,
  UpdateOsEvent,
} from "App/update/constants"
import { OsRelease } from "App/update/dto"
import {
  isBatteryLevelEnoughForUpdate,
  isDownloadRequestCanelledByUser,
} from "App/update/helpers"
import {
  downloadOsUpdateRequest,
  osUpdateAlreadyDownloadedCheck,
} from "App/update/requests"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

interface Params {
  releases: OsRelease[]
}

export const downloadUpdates = createAsyncThunk<
  void,
  Params,
  {
    rejectValue: AppError<UpdateError>
  }
>(
  UpdateOsEvent.DownloadUpdate,
  async ({ releases }, { getState, rejectWithValue, dispatch }) => {
    let state = (await getState()) as RootState & ReduxRootState
    const batteryLevel = state.device.data?.batteryLevel ?? 0

    if (!isBatteryLevelEnoughForUpdate(batteryLevel)) {
      return rejectWithValue(
        new AppError(
          UpdateError.TooLowBattery,
          "Device has too low battery level"
        )
      )
    }

    for (const release of releases) {
      state = (await getState()) as RootState & ReduxRootState

      if (state.update.deviceHasBeenDetachedDuringDownload) {
        return rejectWithValue(
          new AppError(
            UpdateError.UnexpectedDownloadError,
            "Unexpected error while downloading update"
          )
        )
      }
      dispatch(
        setStateForDownloadedRelease({
          state: ReleaseProcessState.InProgress,
          version: release.version,
        })
      )

      const releaseAlreadyDownloaded = await osUpdateAlreadyDownloadedCheck(
        release.file
      )

      if (!releaseAlreadyDownloaded) {
        const result = await downloadOsUpdateRequest({
          url: release.file.url,
          fileName: release.file.name,
        })

        await tryTrackOsDownload(
          {
            environment: OsEnvironment.Daily,
            version: release.version,
            product: release.product,
          },
          state
        )

        if (isDownloadRequestCanelledByUser(result)) {
          return rejectWithValue(
            new AppError(
              UpdateError.DownloadCancelledByUser,
              "Download cancelled by user"
            )
          )
        }

        if (!result.ok) {
          return rejectWithValue(
            new AppError(
              UpdateError.UnexpectedDownloadError,
              "Unexpected error while downloading update"
            )
          )
        }
        state = (await getState()) as RootState & ReduxRootState

        if (state.update.deviceHasBeenDetachedDuringDownload) {
          return rejectWithValue(
            new AppError(
              UpdateError.UnexpectedDownloadError,
              "Unexpected error while downloading update"
            )
          )
        }
      }

      dispatch(
        setStateForDownloadedRelease({
          state: ReleaseProcessState.Done,
          version: release.version,
        })
      )
    }

    return
  }
)

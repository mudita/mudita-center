/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { UpdateError, UpdateOsEvent } from "App/update/constants"
import { Release } from "App/update/dto"
import { isBatteryLevelEnoughForUpdate } from "App/update/helpers"
import {
  downloadOsUpdateRequest,
  osUpdateAlreadyDownloadedCheck,
} from "App/update/requests"
import { DownloadStatus } from "App/__deprecated__/renderer/interfaces/file-download.interface"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

interface Params {
  release: Release
}

export const downloadUpdate = createAsyncThunk<
  void,
  Params,
  {
    rejectValue: AppError<UpdateError>
  }
>(
  UpdateOsEvent.DownloadUpdate,
  async ({ release }, { getState, rejectWithValue }) => {
    const { device } = getState() as RootState & ReduxRootState
    const batteryLevel = device.data?.batteryLevel ?? 0

    if (!isBatteryLevelEnoughForUpdate(batteryLevel)) {
      return rejectWithValue(
        new AppError(
          UpdateError.TooLowBattery,
          "Device has too low battery level"
        )
      )
    }

    if (await osUpdateAlreadyDownloadedCheck(release.file)) {
      return
    }

    const result = await downloadOsUpdateRequest({
      url: release.file.url,
      fileName: release.file.name,
    })

    const isActionCanelledByUser = () => {
      return !result.ok && result.data === DownloadStatus.Cancelled
    }

    if (isActionCanelledByUser()) {
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

    return
  }
)

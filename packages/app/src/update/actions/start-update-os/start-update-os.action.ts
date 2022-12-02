/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { removeFile } from "App/device-file-system"
import { DiagnosticsFilePath } from "App/device/constants"
import { UpdateError, UpdateOsEvent } from "App/update/constants"
import { isBatteryLevelEnoughForUpdate } from "App/update/helpers"
import { startOsUpdate } from "App/update/requests"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

export const startUpdateOs = createAsyncThunk<
  void,
  string,
  {
    rejectValue: AppError<UpdateError>
  }
>(
  UpdateOsEvent.StartOsUpdateProcess,
  async (file, { dispatch, rejectWithValue, getState }) => {
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

    await dispatch(removeFile(DiagnosticsFilePath.UPDATER_LOG))
    const result = await startOsUpdate({ fileName: file })

    if (!result.ok) {
      return rejectWithValue(
        new AppError(
          UpdateError.UpdateOsProcess,
          "Device updating process failed"
        )
      )
    }

    return
  }
)

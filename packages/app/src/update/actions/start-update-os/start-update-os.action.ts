/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { removeFile } from "App/device-file-system"
import { DiagnosticsFilePath } from "App/device/constants"
import { setStateForInstalledRelease } from "App/update/actions/base.action"
import {
  ReleaseProcessState,
  UpdateError,
  UpdateOsEvent,
} from "App/update/constants"
import { OsRelease } from "App/update/dto"
import { isBatteryLevelEnoughForUpdate } from "App/update/helpers"
import { startOsUpdate } from "App/update/requests"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

interface Params {
  releases: OsRelease[]
}

export const startUpdateOs = createAsyncThunk<
  void,
  Params,
  {
    rejectValue: AppError<UpdateError>
  }
>(
  UpdateOsEvent.StartOsUpdateProcess,
  async ({ releases }, { dispatch, rejectWithValue, getState }) => {
    // TODO [mw] dispatch request with deleting release from the user computer - scope of CP-1687
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

    for (const release of releases) {
      dispatch(
        setStateForInstalledRelease({
          state: ReleaseProcessState.InProgress,
          version: release.version,
        })
      )

      const result = await startOsUpdate({ fileName: release.file.name })

      if (!result.ok) {
        return rejectWithValue(
          new AppError(
            UpdateError.UpdateOsProcess,
            "Device updating process failed"
          )
        )
      }

      dispatch(
        setStateForInstalledRelease({
          state: ReleaseProcessState.Done,
          version: release.version,
        })
      )
    }

    return
  }
)

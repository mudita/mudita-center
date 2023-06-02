/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { downloadUpdates } from "App/update/actions/download-updates/download-updates.action"
import { startUpdateOs } from "App/update/actions/start-update-os/start-update-os.action"
import { UpdateError, UpdateOsEvent } from "App/update/constants"
import { OsRelease } from "App/update/dto"
import { rejectedAction } from "App/__deprecated__/renderer/store/helpers/action.helper"

interface Params {
  releases: OsRelease[]
}

export const forceUpdate = createAsyncThunk<void, Params>(
  UpdateOsEvent.StartOsForceUpdateProcess,
  async ({ releases }, { dispatch, rejectWithValue }) => {
    const downloadUpdate = await dispatch(downloadUpdates({ releases }))
    if (downloadUpdate.type === rejectedAction(UpdateOsEvent.DownloadUpdate)) {
      console.log("from force update action download rejection if statement")
      const error =
        downloadUpdate.payload ??
        new AppError(UpdateError.ForceUpdateError, "Error during download")
      return rejectWithValue(error)
    }

    const installUpdateResult = await dispatch(startUpdateOs({ releases }))

    if (
      installUpdateResult.type ===
      rejectedAction(UpdateOsEvent.StartOsUpdateProcess)
    ) {
      console.log("from force update action update rejection if statement")
      return rejectWithValue(installUpdateResult.payload)
    }

    return
  }
)

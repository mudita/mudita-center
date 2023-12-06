/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "Core/core/errors"
import { downloadUpdates } from "Core/update/actions/download-updates/download-updates.action"
import { startUpdateOs } from "Core/update/actions/start-update-os/start-update-os.action"
import { UpdateError, UpdateOsEvent } from "Core/update/constants"
import { OsRelease } from "Core/update/dto"
import { rejectedAction } from "Core/__deprecated__/renderer/store/helpers/action.helper"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

interface Params {
  releases: OsRelease[]
}

export const forceUpdate = createAsyncThunk<
  void,
  Params,
  { state: ReduxRootState }
>(
  UpdateOsEvent.StartOsForceUpdateProcess,
  async ({ releases }, { dispatch, rejectWithValue }) => {
    const downloadUpdate = await dispatch(downloadUpdates({ releases }))
    if (downloadUpdate.type === rejectedAction(UpdateOsEvent.DownloadUpdate)) {
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
      return rejectWithValue(installUpdateResult.payload)
    }

    return
  }
)

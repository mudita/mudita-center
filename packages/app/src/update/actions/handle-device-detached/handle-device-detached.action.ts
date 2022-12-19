/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { State } from "App/core/constants"
import { DownloadState, UpdateOsEvent } from "App/update/constants"
import { cancelOsDownload } from "App/update/requests"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"

export const handleDeviceDetached = createAsyncThunk<void, void>(
  UpdateOsEvent.HandleDeviceDetached,
  (_, { getState }) => {
    const { update } = getState() as RootState & ReduxRootState

    if (update.downloadState === DownloadState.Loading) {
      cancelOsDownload(true)
    }

    if (update.updateOsState === State.Loading) {
      // TODO [mw] how handle this situation?
    }
  }
)

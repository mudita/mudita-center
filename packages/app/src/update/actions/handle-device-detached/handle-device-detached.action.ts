/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DownloadState, UpdateOsEvent } from "App/update/constants"
import { cancelOsDownload } from "App/update/requests"
import { ReduxRootState, RootState } from "App/__deprecated__/renderer/store"
import { setDeviceHasBeenDetachedDuringDownload } from "../base.action"

export const handleDeviceDetached = createAsyncThunk<void, void>(
  UpdateOsEvent.HandleDeviceDetached,
  (_, { getState, dispatch }) => {
    const { update } = getState() as RootState & ReduxRootState

    if (update.downloadState === DownloadState.Loading) {
      console.log("from handleDeviceDetached action if statement")
      dispatch(setDeviceHasBeenDetachedDuringDownload(true))
      cancelOsDownload(true)
    }
  }
)

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { setExternalUsageDeviceRequest } from "App/analytic-data-tracker/requests/set-external-usage-device.request"
import { DownloadState, UpdateOsEvent } from "App/update/constants"
import { cancelOsDownload } from "App/update/requests"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { setDeviceData } from "App/device/actions/base.action"

export const handleDeviceDetached = createAsyncThunk<
  void,
  void,
  { state: ReduxRootState }
>(UpdateOsEvent.HandleDeviceDetached, async (_, { dispatch, getState }) => {
  const { update } = getState()

  dispatch(setDeviceData(null))

  if (update.downloadState === DownloadState.Loading) {
    cancelOsDownload(true)
  }

  await setExternalUsageDeviceRequest(false)
})

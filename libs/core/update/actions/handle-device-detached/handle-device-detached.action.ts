/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { setExternalUsageDeviceRequest } from "Core/analytic-data-tracker/requests/set-external-usage-device.request"
import { DownloadState, UpdateOsEvent } from "Core/update/constants"
import { cancelOsDownload } from "Core/update/requests"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { setDeviceData } from "Core/device/actions/base.action"

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

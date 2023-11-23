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
import { State } from "App/core/constants"
import { clearStateAndData } from "App/update/actions"

export const handleDeviceDetached = createAsyncThunk<
  void,
  void,
  { state: ReduxRootState }
>(UpdateOsEvent.HandleDeviceDetached, async (_, { dispatch, getState }) => {
  const { update, backup } = getState()

  dispatch(setDeviceData(null))

  if (update.downloadState === DownloadState.Loading) {
    cancelOsDownload(true)
  }

  await setExternalUsageDeviceRequest(false)

  const restarting =
    update.updateOsState === State.Loading ||
    backup.restoringState === State.Loading ||
    backup.backingUpState === State.Loading

  if (!restarting) {
    dispatch(clearStateAndData())
  }
})

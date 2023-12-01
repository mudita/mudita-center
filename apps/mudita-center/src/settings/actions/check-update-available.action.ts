/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SettingsEvent } from "App/settings/constants"
import checkAppUpdateRequest from "App/__deprecated__/renderer/requests/check-app-update.request"
import { setCheckingForUpdate } from "App/settings/actions/set-checking-for-update-action"

export const checkUpdateAvailable = createAsyncThunk<void, void>(
  SettingsEvent.CheckUpdateAvailable,
  async (_, { dispatch }) => {
    dispatch(setCheckingForUpdate(true))
    await checkAppUpdateRequest()
  }
)

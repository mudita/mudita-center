/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SettingsEvent } from "App/settings/constants"
import { updateSettings } from "App/settings/requests"

export const setUSBAccessRestart = createAsyncThunk<boolean, boolean>(
  SettingsEvent.SetUSBAccessRestart,
  async (payload) => {
    await updateSettings({ key: "usbAccessRestart", value: payload })

    return payload
  }
)

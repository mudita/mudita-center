/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SettingsEvent } from "Core/settings/constants"
import { updateSettings } from "Core/settings/requests"

export const setUSBAccessRestart = createAsyncThunk<boolean, boolean>(
  SettingsEvent.SetUSBAccessRestart,
  async (payload) => {
    await updateSettings({ key: "usbAccessRestart", value: payload })

    return payload
  }
)

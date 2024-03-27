/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SettingsEvent } from "Core/settings/constants"
import { updateSettings } from "Core/settings/requests"

export const setUSBAccessRestartRequired = createAsyncThunk<boolean, boolean>(
  SettingsEvent.SetUSBAccessRestartRequired,
  async (payload) => {
    await updateSettings({ key: "usbAccessRestartRequired", value: payload })

    return payload
  }
)

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SettingsEvent } from "Core/settings/constants"
import { updateSettings } from "Core/settings/requests"

export const setOsBackupLocation = createAsyncThunk<string, string>(
  SettingsEvent.SetOsBackupLocation,
  async (payload) => {
    await updateSettings({ key: "osBackupLocation", value: payload })

    return payload
  }
)

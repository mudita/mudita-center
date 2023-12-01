/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SettingsEvent } from "App/settings/constants"
import { updateSettings } from "App/settings/requests"

export const setLowBattery = createAsyncThunk<boolean, boolean>(
  SettingsEvent.SetLowBattery,
  async (payload) => {
    await updateSettings({ key: "lowBattery", value: payload })

    return payload
  }
)

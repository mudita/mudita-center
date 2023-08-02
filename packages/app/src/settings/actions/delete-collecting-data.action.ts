/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SettingsEvent } from "App/settings/constants"
import { updateSettings } from "App/settings/requests"

export const deleteCollectingData = createAsyncThunk(
  SettingsEvent.DeleteCollectingData,
  async () => {
    await updateSettings({ key: "collectingData", value: undefined })

    return
  }
)

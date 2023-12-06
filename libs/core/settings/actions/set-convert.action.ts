/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SettingsEvent } from "Core/settings/constants"
import { Convert } from "Core/settings/constants"
import { updateSettings } from "Core/settings/requests"

export const setConvert = createAsyncThunk<Convert, Convert>(
  SettingsEvent.SetConvert,
  async (payload) => {
    await updateSettings({ key: "convert", value: payload })

    return payload
  }
)

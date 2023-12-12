/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SettingsEvent } from "Core/settings/constants"
import { ConversionFormat } from "Core/settings/constants"
import { updateSettings } from "Core/settings/requests"

export const setConversionFormat = createAsyncThunk<
  ConversionFormat,
  ConversionFormat
>(SettingsEvent.SetConversionFormat, async (payload) => {
  await updateSettings({ key: "conversionFormat", value: payload })

  return payload
})

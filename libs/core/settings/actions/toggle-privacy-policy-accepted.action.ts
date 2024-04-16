/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SettingsEvent } from "Core/settings/constants"
import { toggleTrackingRequest } from "Core/analytic-data-tracker/requests"
import { updateSettings } from "Core/settings/requests"
import logger from "Core/__deprecated__/main/utils/logger"

export const togglePrivacyPolicyAccepted = createAsyncThunk<boolean, boolean>(
  SettingsEvent.TogglePrivacyPolicyAccepted,
  async (payload) => {
    payload ? logger.enableRollbar() : logger.disableRollbar()
    await toggleTrackingRequest(payload)
    await updateSettings({ key: "privacyPolicyAccepted", value: payload })

    return payload
  }
)

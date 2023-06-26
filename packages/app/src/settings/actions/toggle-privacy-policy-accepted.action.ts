/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { SettingsEvent } from "App/settings/constants"
import { toggleTrackingRequest } from "App/analytic-data-tracker/requests"
import { updateSettings } from "App/settings/requests"
import logger from "App/__deprecated__/main/utils/logger"

export const togglePrivacyPolicyAccepted = createAsyncThunk<boolean, boolean>(
  SettingsEvent.TogglePrivacyPolicyAccepted,
  async (payload) => {
    payload ? logger.enableRollbar() : logger.disableRollbar()
    await toggleTrackingRequest(payload)
    await updateSettings({ key: "privacyPolicyAccepted", value: payload })

    return payload
  }
)

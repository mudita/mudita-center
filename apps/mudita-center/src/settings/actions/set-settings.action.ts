/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { SettingsEvent } from "App/settings/constants"
import { SettingsState } from "App/settings/reducers"

export const setSettings = createAction<
  Omit<
    SettingsState,
    "loaded" | "loading" | "updateAvailable" | "latestVersion"
  >
>(SettingsEvent.SetSettings)

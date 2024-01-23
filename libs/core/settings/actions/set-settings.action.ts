/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { SettingsEvent } from "Core/settings/constants"
import { SettingsState } from "Core/settings/reducers"

export const setSettings = createAction<
  Omit<
    SettingsState,
    | "loaded"
    | "loading"
    | "updateAvailable"
    | "latestVersion"
    | "updateAvailableSkipped"
  >
>(SettingsEvent.SetSettings)

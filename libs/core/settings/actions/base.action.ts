/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { SettingsEvent } from "Core/settings/constants"
import { SettingsState } from "Core/settings/reducers"

export const setSettings = createAction<Omit<SettingsState,
  | "loaded"
  | "loading"
  | "updateAvailable"
  | "latestVersion"
  | "updateAvailableSkipped">>(SettingsEvent.SetSettings)

export const skipAvailableUpdate = createAction(
  SettingsEvent.SkipAvailableUpdate,
)

export const setCheckingForUpdateFailed = createAction<boolean>(
  SettingsEvent.SetCheckingForUpdateFailed,
)

export const setCheckingForUpdate = createAction<boolean>(
  SettingsEvent.SetCheckingForUpdate,
)

export const toggleApplicationUpdateAvailable = createAction<boolean>(
  SettingsEvent.ToggleUpdateAvailable,
)

export const setLatestVersion = createAction<string>(
  SettingsEvent.SetLatestVersion,
)

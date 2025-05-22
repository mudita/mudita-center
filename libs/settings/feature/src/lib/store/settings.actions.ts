/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"

export const setCheckingForUpdate = createAction<boolean>(
  "settings/setCheckingForUpdate"
)
export const setCheckingForUpdateFailed = createAction<boolean>(
  "settings/setCheckingForUpdateFailed"
)
export const toggleApplicationUpdateAvailable = createAction<boolean>(
  "settings/toggleApplicationUpdateAvailable"
)
export const setLatestVersion = createAction<string>(
  "settings/setLatestVersion"
)
export const setCurrentVersion = createAction<string>(
  "settings/setCurrentVersion"
)

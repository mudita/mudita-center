/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { SettingsEvent } from "Core/settings/constants"

export const skipAvailableUpdate = createAction(
  SettingsEvent.SkipAvailableUpdate
)
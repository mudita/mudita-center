/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { settingsStateSelector } from "Core/settings/selectors/get-settings-state.selector"

export const isUsbAccessRestartSelector = createSelector(
  settingsStateSelector,
  ({ usbAccessRestart }): boolean => {
    return usbAccessRestart
  }
)

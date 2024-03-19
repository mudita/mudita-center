/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { isAppUpdateProcessPassed } from "Core/app-initialization/selectors/is-app-update-process-passed.selector"
import { isUsbAccessGrantedSelector } from "Core/settings/selectors/is-usb-access-granted.selector"

export const isAppInitializationFinishedSelector = createSelector(
  isAppUpdateProcessPassed,
  isUsbAccessGrantedSelector,
  (appUpdateProcessPassed, usbAccessGranted): boolean => {
    return appUpdateProcessPassed && usbAccessGranted
  }
)

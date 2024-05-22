/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { isAppUpdateProcessPassed } from "Core/app-initialization/selectors/is-app-update-process-passed.selector"
import { isUsbAccessGrantedSelector } from "Core/settings/selectors/is-usb-access-granted.selector"
import { settingsStateSelector } from "Core/settings/selectors"

export const isAppInitializationFinishedSelector = createSelector(
  isAppUpdateProcessPassed,
  isUsbAccessGrantedSelector,
  settingsStateSelector,
  (
    appUpdateProcessPassed,
    usbAccessGranted,
    { privacyPolicyAccepted }
  ): boolean => {
    return appUpdateProcessPassed && usbAccessGranted && Boolean(privacyPolicyAccepted)
  }
)

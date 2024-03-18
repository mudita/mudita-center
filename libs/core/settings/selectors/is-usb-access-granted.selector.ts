/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { settingsStateSelector } from "Core/settings/selectors/get-settings-state.selector"
import { modalsManagerStateSelector } from "Core/modals-manager"

export const isUsbAccessGrantedSelector = createSelector(
  settingsStateSelector,
  modalsManagerStateSelector,
  (settingsState, modalsManager): boolean => {
    const { usbAccessRestartRequired, userHasSerialPortAccess } = settingsState
    const { usbAccessFlowShow } = modalsManager
    return (
      !usbAccessRestartRequired &&
      userHasSerialPortAccess === true &&
      !usbAccessFlowShow
    )
  }
)

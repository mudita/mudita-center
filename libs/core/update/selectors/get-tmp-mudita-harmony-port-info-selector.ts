/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import { createSelector } from "@reduxjs/toolkit"
import { updateStateSelector } from "Core/update/selectors/update-state-selector"

export const getTmpMuditaHarmonyPortInfoSelector = createSelector(
  updateStateSelector,
  (updateState): PortInfo | undefined => {
    return updateState.tmpMuditaHarmonyPortInfo
  }
)


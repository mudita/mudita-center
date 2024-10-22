/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { SynchronizeTimeEvent } from "../constants/event.constant"

export const resetTimeSynchronizationStatus = createAction(
  SynchronizeTimeEvent.ResetStatus
)

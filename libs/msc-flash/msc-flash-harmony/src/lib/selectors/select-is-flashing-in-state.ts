/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { FlashingProcessState } from "../constants"
import { selectFlashingProcessState } from "./select-flashing-process-state"

export const selectIsFlashingInState = (targetState: FlashingProcessState) =>
  createSelector(
    selectFlashingProcessState,
    (flashingProcessState) => flashingProcessState === targetState
  )

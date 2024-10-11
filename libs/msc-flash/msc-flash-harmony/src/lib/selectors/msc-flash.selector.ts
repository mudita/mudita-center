/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FlashingProcessState } from "../constants"

export const selectFlashingProcessState = createSelector(
  (state: ReduxRootState) => state.flashing.processState,
  (processState: FlashingProcessState) => processState
)

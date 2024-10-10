/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ActionName } from "generic-view/store"
import { FlashingProcessState } from "../constants"

export const setFlashingProcessState = createAction<FlashingProcessState>(
  ActionName.MscFlashingSetProcessState
)

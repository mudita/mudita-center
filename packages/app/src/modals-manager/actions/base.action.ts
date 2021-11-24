/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { ModalsManagerEvent } from "App/modals-manager/constants"

export const toggleAllModalsShowBlocked = createAction<boolean>(
  ModalsManagerEvent.ToggleAllModalsShowBlocked
)

export const toggleCollectingDataModalShow = createAction<boolean>(
  ModalsManagerEvent.ToggleCollectingDataModalShow
)

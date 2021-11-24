/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { GlobalModalsManagerEvent } from "App/global-modals-manager/constants"

export const setAllModalsShowBlocked = createAction<boolean>(
  GlobalModalsManagerEvent.SetAllModalsShowBlocked
)

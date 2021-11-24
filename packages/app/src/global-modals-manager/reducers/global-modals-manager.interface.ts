/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { GlobalModalsManagerEvent } from "App/global-modals-manager/constants"

export interface GlobalModalsManagerState {
  allModalsShowBlocked: boolean
}

export type SetAllModalsShowBlockedAction = PayloadAction<
  boolean,
  GlobalModalsManagerEvent.SetAllModalsShowBlocked
>

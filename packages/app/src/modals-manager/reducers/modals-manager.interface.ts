/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { ModalsManagerEvent } from "App/modals-manager/constants"

export interface ModalsManagerState {
  allModalsShowBlocked: boolean
  collectingDataModalShow: boolean
}

export type ToggleAllModalsShowBlockedAction = PayloadAction<
  boolean,
  ModalsManagerEvent.ToggleAllModalsShowBlocked
>

export type ToggleCollectingDataModalShow = PayloadAction<
  boolean,
  ModalsManagerEvent.ToggleCollectingDataModalShow
>

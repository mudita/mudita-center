/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { ModalsManagerEvent } from "App/modals-manager/constants"

export interface ModalsManagerState {
  collectingDataModalShow: boolean
}

export type SetModalsStateAction = PayloadAction<
  ModalsManagerState,
  ModalsManagerEvent.SetModalsState
>

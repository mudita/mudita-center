/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { ModalsManagerEvent } from "App/modals-manager/constants"

export interface ModalsManagerState {
  collectingDataModalShow: boolean
  appForcedUpdateFlowShow: boolean
}

export enum ModalKey {
  CollectingDataModal,
  ForcedUpdateFlow,
}

export type ShowModalAction = PayloadAction<
  ModalKey,
  ModalsManagerEvent.ShowModal
>

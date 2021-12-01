/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import { ModalsManagerEvent } from "App/modals-manager/constants"

export enum ModalStateKey {
  CollectingDataModal = "collectingDataModalShow",
  AppForcedUpdateFlow = "appForcedUpdateFlowShow",
  AppUpdateFlow = "appUpdateFlowShow",
  ContactSupportFlow = "contactSupportFlowShow",
}

export interface ModalsManagerState extends Record<ModalStateKey, boolean> {
  collectingDataModalShow: boolean
  appForcedUpdateFlowShow: boolean
  appUpdateFlowShow: boolean
  contactSupportFlowShow: boolean
}

export type ShowModalAction = PayloadAction<
  ModalStateKey,
  ModalsManagerEvent.ShowModal
>

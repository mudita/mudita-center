/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ModalStateKey {
  AppForcedUpdateFlow = "appForcedUpdateFlowShow",
  AppUpdateFlow = "appUpdateFlowShow",
  ContactSupportFlow = "contactSupportFlowShow",
  DeviceInitializationFailedModalShow = "deviceInitializationFailedModalShow",
}

export interface ModalsManagerState extends Record<ModalStateKey, boolean> {
  appForcedUpdateFlowShow: boolean
  appUpdateFlowShow: boolean
  contactSupportFlowShow: boolean
  deviceInitializationFailedModalShow: boolean
}

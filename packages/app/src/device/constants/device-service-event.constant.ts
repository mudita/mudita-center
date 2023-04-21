/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DeviceServiceEvent {
  DeviceConnected = "device-service-connected",
  DeviceDisconnected = "device-service-disconnected",
  DeviceInitializationFailed = "device-service-initialization-failed",
  DeviceUnlocked = "device-service-unlocked",
  DeviceLocked = "device-service-locked",
  DeviceAgreementNotAccepted = "device-service-agreement-not-accepted",
  DeviceAgreementAccepted = "device-service-agreement-accepted",
}

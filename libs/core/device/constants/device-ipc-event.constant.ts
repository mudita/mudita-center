/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DeviceIpcEvent {
  DeviceOnboardingStatus = "device-onboarding-status",
  DeviceConnected = "device-connected",
  DeviceDisconnected = "device-disconnected",
  DeviceInitializationFailed = "device-initialization-failed",
  DeviceLockTimeUpdated = "device-lock-time-updated",
  DeviceLocked = "locked-device",
  DeviceUnlocked = "unlocked-device",
}

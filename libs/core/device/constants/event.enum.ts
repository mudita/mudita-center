/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DeviceEvent {
  Unlock = "DEVICE_UNLOCK",
  UnlockById = "DEVICE_UNLOCK_BY_ID",
  Locked = "DEVICE_LOCKED",
  Unlocked = "DEVICE_UNLOCKED",
  SetLockTime = "DEVICE_SET_LOCK_TIME",
  GetUnlockedStatus = "DEVICE_GET_UNLOCKED_STATUS",
  SetUnlockedStatus = "DEVICE_SET_UNLOCKED_STATUS",

  GetOnboardingStatus = "DEVICE_GET_ONBOARDING_STATUS",
  SetOnboardingStatus = "DEVICE_SET_ONBOARDING_STATUS",
  SetRestartingStatus = "DEVICE_SET_RESTARTING_STATUS",
  SetCriticalBatteryLevelStatus = "DEVICE_SET_CRITICAL_BATTERY_LEVEL_STATUS",
  SetExternalUsageDevice = "DEVICE_SET_EXTERNAL_USAGE_DEVICE",

  LoadStorageInfo = "DEVICE_LOAD_STORAGE_INFO",

  LoadDeviceData = "DEVICE_LOAD_DEVICE_DATA",
  ProcessDeviceDataOnLoad = "DEVICE_PROCESS_DEVICE_DATA_ON_LOAD",
  HandleCommunicationError = "DEVICE_HANDLE_COMMUNICATION_ERROR",
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DeviceEvent {
  SetInitState = "DEVICE_SET_INIT_STATE",

  GetConnected = "DEVICE_GET_CONNECTED",
  SetData = "DEVICE_SET_DATA",

  SetConnectionState = "DEVICE_SET_CONNECTION_STATE",
  Connected = "DEVICE_CONNECTED",
  Disconnected = "DEVICE_DISCONNECTED",

  Unlock = "DEVICE_UNLOCK",
  Locked = "DEVICE_LOCKED",
  Unlocked = "DEVICE_UNLOCKED",
  SetLockTime = "DEVICE_SET_LOCK_TIME",
  GetUnlockedStatus = "DEVICE_GET_UNLOCKED_STATUS",

  Loading = "DEVICE_DATA_LOADING",

  ChangeSimData = "DEVICE_CHANGE_SIM",
  SetSimData = "DEVICE_SET_SIM_DATA",

  SetOsVersionData = "DEVICE_SET_OS_VERSION_DATA",

  LoadStorageInfo = "DEVICE_LOAD_STORAGE_INFO",
  OnboardingStatus = "DEVICE_ONBOARDING_STATUS",
  CriticalBatteryLevel = "CRITICAL_BATTERY_LEVEL",

  ExternalUsageDevice = "EXTERNAL_USAGE_DEVICE",

  Restarting = "DEVICE_RESTARTING",
}

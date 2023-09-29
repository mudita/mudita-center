/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DeviceError {
  Loading = "DEVICE_LOADING_ERROR",
  Connection = "DEVICE_CONNECTION_ERROR",
  Disconnection = "DEVICE_DISCONNECTION_ERROR",
  Unlocking = "DEVICE_UNLOCKING_ERROR",
  Locking = "DEVICE_LOCKING_ERROR",
  Locked = "DEVICE_LOCKED_ERROR",
  InvalidPhoneLockTime = "DEVICE_INVALID_PHONE_LOCK_TIME_ERROR",
  ChangeSim = "DEVICE_CHANGE_SIM_ERROR",
  LoadStorageInfo = "DEVICE_LOAD_STORAGE_INFO_ERROR",
}

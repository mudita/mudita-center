/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DeviceStatus {
  Initializing = "initializing", // Connection is being established, first api calls are being made (e.g. getting device metadata)
  Locked = "locked", // Device is locked, user needs to unlock it to interact with it
  Initialized = "initialized", // Device fully operational, metadata is available, user can interact with it
  Issue = "issue", // Device has some non-critical issue, user should be informed about it
  CriticalError = "criticalError", // Device is in critical error state, user should be redirected to troubleshooting page
}

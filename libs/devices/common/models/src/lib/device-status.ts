/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DeviceStatus {
  Attached = "attached", // Device is detected, but metadata is not available yet
  Initializing = "initializing", // Connection is being established, first api calls are being made (e.g. getting device metadata)
  Initialized = "initialized", // Device is initialized and metadata is available, but device can be locked
  CriticalError = "criticalError", // Device is in critical error state, user should be redirected to troubleshooting page
}

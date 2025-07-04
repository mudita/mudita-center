/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum AppUpdateAvailability {
  Available = "available",
  NotAvailable = "not-available",
  Unknown = "unknown",
}

export interface AppUpdaterReducer {
  currentVersion?: string
  newVersion?: string
  updateAvailability: AppUpdateAvailability
  forceUpdate: boolean
  downloadProgress?: number
  silentMode: boolean
  isCheckingForUpdate: boolean
  updateError?: boolean
  modalsOpened?: boolean
}

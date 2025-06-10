/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum AppUpdaterIpcEvents {
  Check = "appUpdater:checkForUpdates",
  Download = "appUpdater:downloadUpdate",
  Install = "appUpdater:installUpdate",
  UpdateDownloadProgress = "appUpdater:updateDownloadProgress",
  UpdateInstallProgress = "appUpdater:updateInstallProgress",
  CancelDownload = "appUpdater:cancelDownload",
}

export enum AppUpdateEvent {
  Available = "application_updater-available",
  NotAvailable = "application_updater-not-available",
  Error = "application_updater-error",
  Downloaded = "application_updater-downloaded",
}

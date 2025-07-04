/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum AppUpdaterIpcEvents {
  Check = "appUpdater:checkForUpdates",
  Download = "appUpdater:downloadUpdate",
  Install = "appUpdater:installUpdate",
  Cancel = "appUpdater:cancelUpdate",
  UpdateDownloadProgress = "appUpdater:updateDownloadProgress",
}

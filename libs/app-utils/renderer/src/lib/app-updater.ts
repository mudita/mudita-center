/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "types-preload"

export const AppUpdater = {
  checkForUpdates: window.api.appUpdater.checkForUpdates,
  downloadUpdate: window.api.appUpdater.downloadUpdate,
  installUpdate: window.api.appUpdater.installUpdate,
  onAvailableUpdateEvent: (callback: (version: string) => void) =>
    window.api.appUpdater.onUpdateEvent.available(callback),
  onNotAvailableUpdateEvent: (callback: () => void) =>
    window.api.appUpdater.onUpdateEvent.notAvailable(callback),
  onUpdateErrorEvent: (callback: (error: unknown) => void) =>
    window.api.appUpdater.onUpdateEvent.error(callback),
  onUpdateDownloadedEvent: (callback: () => void) =>
    window.api.appUpdater.onUpdateEvent.downloaded(callback),
  onUpdateDownloadProgress: window.api.appUpdater.onUpdateDownloadProgress,
  onUpdateInstallProgress: window.api.appUpdater.onUpdateInstallProgress,
  cancelDownload: window.api.appUpdater.cancelDownload,
}

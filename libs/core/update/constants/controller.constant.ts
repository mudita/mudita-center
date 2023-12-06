/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum IpcReleaseEvent {
  GetAllReleases = "os-release_get-all-releases",
  GetLatestRelease = "os-release_get-latest-release",
  GetReleasesByVersions = "os-release_get-releases-by-versions",
}

export enum IpcDeviceUpdateEvent {
  UpdateOS = "device-update_update-os",
  CheckUpdate = "device-update_check-update",
  RemoveDownloadedOsUpdates = "device-update_remove-downloaded-os-updates",
}

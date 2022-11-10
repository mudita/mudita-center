/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const DeviceUpdateControllerPrefix = "device-update"
export const ReleaseControllerPrefix = "release"

export enum IpcReleaseEvent {
  GetAllReleases = "get-all-releases",
  GetLatestRelease = "get-latest-release",
}

export enum IpcReleaseRequest {
  GetAllReleases = "release-get-all-releases",
  GetLatestRelease = "release-get-latest-release",
}

export enum IpcDeviceUpdateEvent {
  UpdateOS = "update-os",
}

export enum IpcDeviceUpdateRequest {
  UpdateOS = "device-update-update-os",
}

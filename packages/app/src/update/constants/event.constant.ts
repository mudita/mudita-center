/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum UpdateOsEvent {
  StartOsUpdateProcess = "START_OS_UPDATE_PROCESS",
  CheckForUpdate = "CHECK_FOR_UPDATE",
  DownloadUpdate = "DOWNLOAD_UPDATE",
  SetCheckForUpdateState = "SET_CHECK_FOR_UPDATE_STATE",
  CancelDownload = "CANCEL_DOWNLOAD",
  CloseUpdateFlow = "CLOSE_UPDATE_FLOW",
  ClearStateAndData = "CLEAR_STATE_AND_DATA",
  SetStateForDownloadedRelease = "SET_STATE_FOR_DOWNLOADED_RELEASE",
  SetStateForInstalledRelease = "SET_STATE_FOR_INSTALLED_RELEASE",
  HandleDeviceAttached = "HANDLE_DEVICE_ATTACHED",
  HandleDeviceDetached = "HANDLE_DEVICE_DETACHED",
  CheckForForceUpdate = "CHECK_FOR_FORCE_UPDATE",
  StartOsForceUpdateProcess = "START_OS_FORCE_UPDATE_PROCESS",
  CloseForceUpdateFlow = "CLOSE_FORCE_UPDATE_FLOW",
  DeviceHasBeenDetachedDuringDownload = "DOWNLOAD_DEVICE_DETACHED",
}

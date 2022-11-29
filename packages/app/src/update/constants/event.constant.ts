/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum UpdateOsEvent {
  StartOsUpdateProcess = "START_OS_UPDATE_PROCESS",
  CheckForUpdate = "CHECK_FOR_UPDATE",
  DownloadUpdate = "DOWNLOAD_UPDATE",
  SetUpdateState = "DEVICE_SET_UPDATE_STATE",
  CancelDownload = "CANCEL_DOWNLOAD",
  ClearState = "CLEAR_STATE",
}

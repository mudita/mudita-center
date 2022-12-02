/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum UpdateErrorServiceErrors {
  GetAllRelease = "GET_ALL_RELEASES_ERROR",
  GetReleasesByVersion = "GET_RELEASES_BY_VERSION",
  CannotGetOsVersion = "CANNOT_GET_OS_VERSION_ERROR",
  UpdateFileUpload = "UPDATE_FILE_UPLOAD_ERROR",
  UpdateCommand = "UPDATE_COMMAND_ERROR",
  VersionDoesntChanged = "VERSION_DOESNT_CHANGE_ERROR",
  CannotGetDeviceInfo = "CANNOT_GET_DEVICE_INFO_ERROR",
  RequestLimitExceeded = "REQUEST_LIMIT_EXCEEDED",
}

export enum UpdateError {
  UpdateOsProcess = "UPDATE_OS_PROCESS",
  CheckForUpdate = "CHECK_FOR_UPDATE",
  DownloadCancelledByUser = "DOWNLOAD_CANCELLED_BY_USER",
  TooLowBattery = "TOO_LOW_BATTERY",
  UnexpectedDownloadError = "UNEXPECTED_DOWNLOAD_ERROR",
}

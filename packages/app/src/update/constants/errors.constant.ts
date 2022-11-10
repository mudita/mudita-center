/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ReleaseError {
  GetAllRelease = "GET_ALL_RELEASES_ERROR",
}

export enum UpdateError {
  CannotGetOsVersion = "CANNOT_GET_OS_VERSION_ERROR",
  UpdateFileUpload = "UPDATE_FILE_UPLOAD_ERROR",
  UpdateCommand = "UPDATE_COMMAND_ERROR",
  VersionDoesntChanged = "VERSION_DOESNT_CHANGE_ERROR",
  CannotGetDeviceInfo = "CANNOT_GET_DEVICE_INFO_ERROR",
  RequestLimitExceeded = "REQUEST_LIMIT_EXCEEDED",
}

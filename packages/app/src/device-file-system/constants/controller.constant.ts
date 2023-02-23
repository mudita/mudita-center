/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "device-file-system"

export enum IpcDeviceFileSystemEvent {
  DownloadDeviceFiles = "download-device-files",
  RemoveDeviceFile = "remove-device-file",
  UploadFileLocally = "upload-file-locally",
  UploadFileToDevice = "upload-file-to-device",
}

export enum IpcDeviceFileSystemRequest {
  DownloadDeviceFiles = "device-file-system-download-device-files",
  RemoveDeviceFile = "device-file-system-remove-device-file",
  UploadFileLocally = "device-file-system-upload-file-locally",
  UploadFileToDevice = "device-file-system-upload-file-to-device",
}

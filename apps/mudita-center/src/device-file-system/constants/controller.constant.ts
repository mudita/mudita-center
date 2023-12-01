/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum IpcDeviceFileSystemEvent {
  DownloadDeviceFiles = "device-file-system_download-device-files",
  RemoveDeviceFile = "device-file-system_remove-device-file",
  UploadFileLocally = "device-file-system_upload-file-locally",
  UploadFileToDevice = "device-file-system_upload-file-to-device",
}

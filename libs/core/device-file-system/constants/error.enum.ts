/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DeviceFileSystemError {
  Removing = "DEVICE_FILE_REMOVING_ERROR",
  FileUploadRequest = "DEVICE_FILE_UPLOADING_REQUEST_ERROR",
  FileUploadChunk = "DEVICE_FILE_UPLOADING_CHUNK_ERROR",
  FileUploadUnreadable = "DEVICE_FILE_UPLOADING_UNREADABLE_ERROR",
  FilesRetrieve = "DEVICE_FILES_RETRIEVE_ERROR",
  FileDeleteCommand = "DEVICE_FILE_DELETE_ERROR",
  NoSpaceLeft = "NO_SPACE_LEFT_ON_DEVICE_ERROR",
  UnsupportedFileSize = "UNSUPPORTED_FILE_SIZE_ERROR",
}

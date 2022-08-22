/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const DialogControllerPrefix = "dialog-file-system"

export enum IpcDialogFileSystemEvent {
  GetPaths = "get-paths",
}

export enum IpcDialogFileSystemRequest {
  GetPaths = "dialog-file-system-get-paths",
}

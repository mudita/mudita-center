/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "files-manager"

export enum IpcFilesManagerEvent {
  GetFiles = "get-files",
}

export enum IpcFilesManagerRequest {
  GetFiles = "files-manager-get-files",
}

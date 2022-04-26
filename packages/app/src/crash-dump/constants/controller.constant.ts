/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "crash-dump"

export enum IpcCrashDumpEvent {
  Ignore = "ignore-file",
  GetFiles = "get-files",
  DownloadFiles = "download-files",
}

export enum IpcCrashDumpRequest {
  Ignore = "crash-dump-ignore-file",
  GetFiles = "crash-dump-get-files",
  DownloadCrashDump = "crash-dump-download-files",
}

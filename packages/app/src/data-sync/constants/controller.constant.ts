/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ControllerPrefix = "data-sync"

export enum IpcDataSyncEvent {
  GetIndex = "get-index",
  IndexAll = "index-all",
  InitializeDataSync = "initialize",
}

export enum IpcDataSyncRequest {
  GetIndex = "data-sync-get-index",
  IndexAll = "data-sync-index-all",
  InitializeDataSync = "data-sync-initialize",
}

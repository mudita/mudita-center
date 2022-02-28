/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DataSyncEvent {
  ReadAllIndexes = "DATA_SYNC_READ_ALL_INDEXES",
  UpdateAllIndexes = "DATA_SYNC_UPDATE_ALL_INDEXES",
  SetDataSyncInitialized = "DATA_SYNC_SET_DATA_SYNC_INITIALIZED",
  SetCacheState = "DATA_SYNC_SET_CACHE_STATE",
  InitializeDataSync = "DATA_SYNC_SET_DATA_SYNC_INITIALIZE",
}

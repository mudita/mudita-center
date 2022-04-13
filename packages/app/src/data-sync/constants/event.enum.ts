/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DataSyncEvent {
  ReadAllIndexes = "DATA_SYNC_READ_ALL_INDEXES",
  UpdateAllIndexes = "DATA_SYNC_UPDATE_ALL_INDEXES",
  SetDataSyncInitialized = "DATA_SYNC_SET_DATA_SYNC_INITIALIZED",
  SetDataSyncInitializingError = "DATA_SYNC_SET_DATA_SYNC_INITIALIZING_ERROR",
  SetCacheState = "DATA_SYNC_SET_CACHE_STATE",
  SetLoadedState = "DATA_SYNC_SET_LOADED_STATE",
  InitializeDataSync = "DATA_SYNC_INITIALIZE_DATA_SYNC",
  InitializingDataSync = "DATA_SYNC_INITIALIZING_DATA_SYNC",
  InitializingDataError = "DATA_SYNC_INITIALIZING_DATA_ERROR",
  SetDataSyncInitState = "DATA_SYNC_SET_INIT_STATE",
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DataSyncEvent {
  ReadAllIndexes = "DATA_SYNC_READ_ALL_INDEXES",
  UpdateAllIndexes = "DATA_SYNC_UPDATE_ALL_INDEXES",
  SetDataSyncInitialized = "DATA_SYNC_SET_DATA_SYNC_INITIALIZED",
  SetDataSyncInitState = "DATA_SYNC_SET_INIT_STATE",
  SetLoadingState = "DATA_SYNC_SET_LOADING_STATE",
  SetCacheState = "DATA_SYNC_SET_CACHE_STATE",
  SetLoadedState = "DATA_SYNC_SET_LOADED_STATE",
  SetErrorState = "DATA_SYNC_SET_ERROR_STATE",
}

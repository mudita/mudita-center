/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum IpcEvent {
  DataUpdated = "data-sync-data-updated",
  DataLoaded = "data-sync-data-loaded",
  DataRestored = "data-sync-data-restored",
  DataInitialized = "data-sync-data-initialized",
  DataError = "data-sync-error",
}

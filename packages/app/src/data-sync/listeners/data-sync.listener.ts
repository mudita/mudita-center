/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "Renderer/store"
import {
  setDataSyncInitialized,
  setDataSyncInitializing,
  setDataSyncInitializingError,
} from "App/data-sync/actions/base-app.action"
import { readAllIndexes } from "App/data-sync/actions/read-all-indexes.action"
import { IpcEvent } from "App/data-sync/constants"

export const registerDataSyncListener = () => {
  ipcRenderer.on(IpcEvent.DataLoaded, () => {
    store.dispatch(readAllIndexes())
    store.dispatch(setDataSyncInitialized())
  })

  ipcRenderer.on(IpcEvent.DataInitialized, () => {
    store.dispatch(setDataSyncInitializing())
  })

  ipcRenderer.on(IpcEvent.DataError, (error) => {
    store.dispatch(setDataSyncInitializingError(error as unknown as Error))
  })
}

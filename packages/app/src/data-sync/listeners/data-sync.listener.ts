/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "Renderer/store"
import {
  setDataSyncInitialized,
  setDataSyncInitializing,
  setLoadedState,
  setDataSyncInitializingError,
} from "App/data-sync/actions/base-app.action"
import { readAllIndexes } from "App/data-sync/actions/read-all-indexes.action"
import { IpcEvent } from "App/data-sync/constants"

const dataUpdated = (): void => {
  store.dispatch(readAllIndexes())
}

const dataLoaded = (): void => {
  store.dispatch(readAllIndexes())
  store.dispatch(setLoadedState())
  store.dispatch(setDataSyncInitialized())
}

const dataInitialized = (): void => {
  store.dispatch(setDataSyncInitializing())
}

const dataError = (error: any): void => {
  store.dispatch(setDataSyncInitializingError(error))
}

export const registerDataSyncListener = (): (() => void) => {
  ipcRenderer.on(IpcEvent.DataUpdated, dataUpdated)
  ipcRenderer.on(IpcEvent.DataLoaded, dataLoaded)
  ipcRenderer.on(IpcEvent.DataInitialized, dataInitialized)
  ipcRenderer.on(IpcEvent.DataError, dataError)

  return () => {
    ipcRenderer.off(IpcEvent.DataUpdated, dataUpdated)
    ipcRenderer.off(IpcEvent.DataLoaded, dataLoaded)
    ipcRenderer.off(IpcEvent.DataInitialized, dataInitialized)
    ipcRenderer.off(IpcEvent.DataError, dataError)
  }
}

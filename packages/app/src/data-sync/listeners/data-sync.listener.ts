/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "App/__deprecated__/renderer/store"
import {
  setDataSyncInitialized,
  setLoadingState,
  setLoadedState,
  setErrorState,
} from "App/data-sync/actions/base-app.action"
import { readAllIndexes } from "App/data-sync/actions/read-all-indexes.action"
import { IpcEvent } from "App/data-sync/constants"

const dataUpdated = (): void => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  store.dispatch(readAllIndexes())
}

const dataLoaded = (): void => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  store.dispatch(readAllIndexes())
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  store.dispatch(setLoadedState())
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  store.dispatch(setDataSyncInitialized())
}

const dataSkipped = (): void => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  store.dispatch(setDataSyncInitialized())
}

const dataLoading = (): void => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  store.dispatch(setLoadingState())
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataError = (error: any): void => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  store.dispatch(setErrorState(error))
}

export const registerDataSyncListener = (): (() => void) => {
  ipcRenderer.on(IpcEvent.DataUpdated, dataUpdated)
  ipcRenderer.on(IpcEvent.DataLoaded, dataLoaded)
  ipcRenderer.on(IpcEvent.DataLoading, dataLoading)
  ipcRenderer.on(IpcEvent.DataError, dataError)
  ipcRenderer.on(IpcEvent.DataSkipped, dataSkipped)

  return () => {
    ipcRenderer.off(IpcEvent.DataUpdated, dataUpdated)
    ipcRenderer.off(IpcEvent.DataLoaded, dataLoaded)
    ipcRenderer.off(IpcEvent.DataLoading, dataLoading)
    ipcRenderer.off(IpcEvent.DataError, dataError)
    ipcRenderer.off(IpcEvent.DataSkipped, dataSkipped)
  }
}

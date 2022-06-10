/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "App/__deprecated__/renderer/store"
import { readAllIndexes } from "App/data-sync/actions/read-all-indexes.action"
import {
  setCacheState,
  setDataSyncInitialized,
} from "App/data-sync/actions/base-app.action"
import { IpcEvent } from "App/data-sync/constants"

const dataRestored = (): void => {
  store.dispatch(setCacheState())
  store.dispatch(readAllIndexes())
  store.dispatch(setDataSyncInitialized())
}

export const registerCacheDataListener = (): (() => void) => {
  ipcRenderer.on(IpcEvent.DataRestored, dataRestored)

  return () => {
    ipcRenderer.off(IpcEvent.DataRestored, dataRestored)
  }
}

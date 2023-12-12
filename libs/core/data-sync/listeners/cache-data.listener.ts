/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "Core/__deprecated__/renderer/store"
import { readAllIndexes } from "Core/data-sync/actions/read-all-indexes.action"
import {
  setCacheState,
  setDataSyncInitialized,
} from "Core/data-sync/actions/base-app.action"
import { IpcEvent } from "Core/data-sync/constants"

const dataRestored = (): void => {
  void store.dispatch(setCacheState())
  void store.dispatch(readAllIndexes())
  void store.dispatch(setDataSyncInitialized())
}

export const registerCacheDataListener = (): (() => void) => {
  ipcRenderer.on(IpcEvent.DataRestored, dataRestored)

  return () => {
    ipcRenderer.off(IpcEvent.DataRestored, dataRestored)
  }
}

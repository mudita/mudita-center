/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "Core/__deprecated__/renderer/store"
import { readAllIndexes } from "Core/data-sync/actions/read-all-indexes.action"
import { IpcEvent } from "Core/data-sync/constants"

const dataUpdated = (): void => {
  void store.dispatch(readAllIndexes())
}

export const registerDataSyncListener = (): (() => void) => {
  ipcRenderer.on(IpcEvent.DataUpdated, dataUpdated)

  return () => {
    ipcRenderer.off(IpcEvent.DataUpdated, dataUpdated)
  }
}

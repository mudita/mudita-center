/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { JsonStoreIpcEvents } from "app-utils/models"
import { electronAPI } from "@electron-toolkit/preload"

export const jsonStore = {
  get: (name: string) => {
    return electronAPI.ipcRenderer.invoke(JsonStoreIpcEvents.Get, name)
  },
  init: (data: {
    name: string
    data: Record<string, unknown>
  }): Promise<void> => {
    return electronAPI.ipcRenderer.invoke(JsonStoreIpcEvents.Init, data)
  },
  has: (name: string): Promise<boolean> => {
    return electronAPI.ipcRenderer.invoke(JsonStoreIpcEvents.Has, name)
  },
  set: (data: {
    name: string
    data: Record<string, unknown>
  }): Promise<boolean> => {
    return electronAPI.ipcRenderer.invoke(JsonStoreIpcEvents.Set, data)
  },
}

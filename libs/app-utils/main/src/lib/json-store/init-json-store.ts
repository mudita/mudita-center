/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { getBaseJsonStoreService } from "./base-json-store.service"
import { JsonStoreIpcEvents } from "app-utils/models"

export const initJsonStore = (ipcMain: IpcMain) => {
  const base = getBaseJsonStoreService()

  ipcMain.removeHandler(JsonStoreIpcEvents.Get)
  ipcMain.handle(JsonStoreIpcEvents.Get, async (_, name: string) => {
    return base.get(name)
  })

  ipcMain.removeHandler(JsonStoreIpcEvents.Init)
  ipcMain.handle(
    JsonStoreIpcEvents.Init,
    async (
      _,
      {
        name,
        data,
      }: {
        name: string
        data: Record<string, unknown>
      }
    ) => {
      return base.init(name, data)
    }
  )

  ipcMain.removeHandler(JsonStoreIpcEvents.Has)
  ipcMain.handle(JsonStoreIpcEvents.Has, async (_, name: string) => {
    return base.has(name)
  })

  ipcMain.removeHandler(JsonStoreIpcEvents.Set)
  ipcMain.handle(
    JsonStoreIpcEvents.Set,
    async (
      _,
      {
        name,
        data,
      }: {
        name: string
        data: Record<string, unknown>
      }
    ) => {
      return base.set(name, data)
    }
  )
}

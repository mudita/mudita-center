/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { electronAPI } from "@electron-toolkit/preload"
import { SqlIpcEvents } from "app-sql/models"

export const sql = {
  run: (name: string, query: string) => {
    return electronAPI.ipcRenderer.invoke(SqlIpcEvents.RunQuery, name, query)
  },
  exec: (name: string, query: string) => {
    return electronAPI.ipcRenderer.invoke(
      SqlIpcEvents.ExecuteQuery,
      name,
      query
    )
  },
}

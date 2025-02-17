/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SqlIpcEvents } from "app-sql/models"

export const AppSql = {
  run: (name: string, query: string) => {
    return window.electron.ipcRenderer.invoke(
      SqlIpcEvents.RunQuery,
      name,
      query
    )
  },
  exec: (name: string, query: string) => {
    return window.electron.ipcRenderer.invoke(
      SqlIpcEvents.ExecuteQuery,
      name,
      query
    )
  },
}

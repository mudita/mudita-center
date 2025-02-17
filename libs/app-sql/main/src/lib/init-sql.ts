/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { SqlIpcEvents } from "app-sql/models"
import { AppSql } from "./app-sql"

let sql: AppSql | null = null

export const initSql = (ipcMain: IpcMain) => {
  if (!sql) {
    sql = new AppSql()
    ipcMain.removeHandler(SqlIpcEvents.RunQuery)
    ipcMain.handle(
      SqlIpcEvents.RunQuery,
      async (_, name: string, query: string) => {
        await (sql as AppSql).runQuery(name, query)
      }
    )
    ipcMain.removeHandler(SqlIpcEvents.ExecuteQuery)
    ipcMain.handle(
      SqlIpcEvents.ExecuteQuery,
      (_, name: string, query: string) => {
        return (sql as AppSql).executeQuery(name, query)
      }
    )
  }
}

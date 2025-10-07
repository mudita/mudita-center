/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcMain } from "electron"
import { AppSqlInitializationOptions, SqlIpcEvents } from "app-sql/models"
import { AppSql } from "./app-sql"

export const initSql = (ipcMain: IpcMain, sql: AppSql) => {
  ipcMain.removeHandler(SqlIpcEvents.Initialize)
  ipcMain.handle(
    SqlIpcEvents.Initialize,
    (_, options: AppSqlInitializationOptions) => {
      return sql.initialize(options)
    }
  )
  ipcMain.removeHandler(SqlIpcEvents.RunQuery)
  ipcMain.handle(
    SqlIpcEvents.RunQuery,
    async (_, name: string, query: string) => {
      await sql.runQuery(name, query)
    }
  )
  ipcMain.removeHandler(SqlIpcEvents.ExecuteQuery)
  ipcMain.handle(
    SqlIpcEvents.ExecuteQuery,
    (_, name: string, query: string) => {
      return sql.executeQuery(name, query)
    }
  )
}

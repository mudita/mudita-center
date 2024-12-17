/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcRenderer } from "electron"
import { SqlIpcEvents } from "app-sql/models"
import { QueryExecResult } from "sql.js"

export interface IpcAppSql extends IpcRenderer {
  invoke(
    channel: SqlIpcEvents.RunQuery,
    name: string,
    query: string
  ): Promise<void>
  invoke(
    channel: SqlIpcEvents.ExecuteQuery,
    name: string,
    query: string
  ): Promise<QueryExecResult[]>
}

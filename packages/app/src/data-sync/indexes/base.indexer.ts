/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import initSqlJs, { SqlJsStatic } from "sql.js"
import { SyncFileSystemService } from "App/data-sync/services/sync-file-system.service"

export abstract class BaseIndexer {
  constructor(private syncFileSystemService: SyncFileSystemService) {}
  get sql(): Promise<SqlJsStatic> {
    // TODO: Will be covered with test as part of  CP-979
    return initSqlJs({
      locateFile: (fileName: string) =>
        // @ts-ignore
        `${__static}/${fileName}`,
    })
  }

  public async getData(filePath: string): Promise<Buffer | undefined | null> {
    try {
      return this.syncFileSystemService.readFileSync(filePath)
    } catch {
      return null
    }
  }
}

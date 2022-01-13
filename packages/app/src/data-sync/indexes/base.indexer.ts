/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import initSqlJs, { Database, SqlJsStatic } from "sql.js"

export abstract class BaseIndexer {
  get sql(): Promise<SqlJsStatic> {
    return initSqlJs({
      locateFile: (fileName: string) =>
        `${__dirname}/../src/data-sync/static/${fileName}`,
    })
  }

  public async getData(dbFileName: string): Promise<ArrayLike<number> | Buffer | null> {
    // TODO: Will be Implement in the next subtask -> CP-961
    return null
  }

  abstract initTmpDatabase(): Promise<Database>
}

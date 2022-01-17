/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import initSqlJs, { SqlJsStatic } from "sql.js"

export abstract class BaseIndexer {
  get sql(): Promise<SqlJsStatic> {
    // TODO: Will be covered with test as part of  CP-979
    return initSqlJs({
      locateFile: (fileName: string) =>
        `${__dirname}/../src/data-sync/static/${fileName}`,
    })
  }

  public async getData(dbFileName: string): Promise<ArrayLike<number> | Buffer | null> {
    // TODO: Will be Implement in the next subtask -> CP-961
    return null
  }
}

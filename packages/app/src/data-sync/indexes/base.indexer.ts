/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import initSqlJs, { SqlJsStatic } from "sql.js"

export abstract class BaseIndexer {
  get sql(): Promise<SqlJsStatic> {
    // TODO: Will be covered with test as part of  CP-979
    return initSqlJs({
      locateFile: (fileName: string) =>
        // @ts-ignore
        `${__static}/${fileName}`,
    })
  }

  public async getData(
    dbFilePath: string
  ): Promise<ArrayLike<number> | Buffer | null> {
    try {
      return fs.readFileSync(dbFilePath)
    } catch {
      return null
    }
  }
}

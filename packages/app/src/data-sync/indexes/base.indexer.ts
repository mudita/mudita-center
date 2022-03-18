/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import initSqlJs, { SqlJsStatic } from "sql.js"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"

export abstract class BaseIndexer {
  constructor(private fileSystemService: FileSystemService) {}
  get sql(): Promise<SqlJsStatic> {
    // TODO: Will be covered with test as part of  CP-979
    return initSqlJs({
      locateFile: (fileName: string) =>
        // @ts-ignore
        `${__static}/${fileName}`,
    })
  }

  public async getData(
    filePath: string,
    token: string
  ): Promise<Buffer | undefined | null> {
    try {
      return this.fileSystemService.readEncryptedFile(filePath, token)
    } catch {
      return null
    }
  }
}

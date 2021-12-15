/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import initSqlJs, { SqlJsStatic, Database } from "sql.js"
import { DeviceFileSystemService } from "Backend/device-file-system-service/device-file-system-service"

export abstract class BaseIndexer {
  constructor(private deviceFileSystem: DeviceFileSystemService) {}

  get sql(): Promise<SqlJsStatic> {
    return initSqlJs({
      locateFile: (fileName: string) =>
        `${__dirname}/../src/data-sync/static/${fileName}`,
    })
  }

  public async getData(dataLocation: string, destinationPath: string) {
    const { data } = await this.deviceFileSystem.downloadLocally(
      [dataLocation],
      destinationPath
    )

    if (!data?.length) {
      return
    }

    return fs.readFileSync(data[0])
  }

  abstract initTmpDatabase(): Promise<Database>
}

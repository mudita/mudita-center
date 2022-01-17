/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs"
import path from "path"
import initSqlJs, { SqlJsStatic } from "sql.js"
import DeviceBackupAdapter from "Backend/adapters/device-backup/device-backup-adapter.class"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import getAppPath from "App/main/utils/get-app-path"
import { extract } from "App/data-sync/helpers"

const syncCatalogName = "sync"

export abstract class BaseIndexer {
  protected constructor(private deviceBackup: DeviceBackupAdapter) {}

  get sql(): Promise<SqlJsStatic> {
    // TODO: Will be covered with test as part of  CP-979
    return initSqlJs({
      locateFile: (fileName: string) => `${__dirname}/../static/${fileName}`,
    })
  }

  public async getData(
    dbFileName: string
  ): Promise<ArrayLike<number> | Buffer | null> {
    const fileDir = path.join(getAppPath(), syncCatalogName)
    const dbFilePath = path.join(fileDir, dbFileName)

    const { status, data } =
      await this.deviceBackup.downloadDeviceBackupLocally(syncCatalogName)
    if (status !== DeviceResponseStatus.Ok || data === undefined) {
      return null
    }

    try {
      await extract(data[0], { C: fileDir })
      return fs.readFileSync(dbFilePath)
    } catch {
      return null
    }
  }
}

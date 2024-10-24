/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Database } from "sql.js"
import { Index } from "elasticlunr"
import { ElasticlunrFactory } from "Core/index-storage/factories"
import { BaseIndexer } from "Core/data-sync/indexes/base.indexer"
import { CallLogTable } from "Core/data-sync/constants"
import {
  IndexerPresenter,
  CallLogObject,
  CallLogInput,
} from "Core/data-sync/types"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"

export class CallLogIndexer extends BaseIndexer {
  constructor(
    fileSystemService: FileSystemService,
    private dataPresenter: IndexerPresenter<CallLogInput, CallLogObject[]>
  ) {
    super(fileSystemService)
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async index(fileDir: string, token?: string): Promise<any> {
    const db = await this.initTmpDatabase(fileDir, token)
    const object = this.dataPresenter.serializeToObject(this.loadTables(db))
    return this.createIndex(object)
  }

  private createIndex(data: CallLogObject[]): Index<CallLogObject> {
    const index = ElasticlunrFactory.create<CallLogObject>()

    index.setRef("id")
    index.addField("phone")
    index.addField("callDate")
    index.addField("callDuration")
    index.addField("presentation")
    index.addField("callType")
    index.addField("isNew")

    data.forEach((item) => {
      index.addDoc(item)
    })

    return index
  }

  private loadTables(db: Database) {
    return {
      [CallLogTable.Calls]: db.exec(
        `SELECT _id, number, e164number, presentation, date, duration, type, name, contactId, isRead FROM ${CallLogTable.Calls};`
      )[0] as unknown as CallLogInput["calls"],
    }
  }

  private async initTmpDatabase(
    fileDir: string,
    token?: string
  ): Promise<Database> {
    const data = await this.getData(path.join(fileDir, "calllog.db"), token)
    return new (await this.sql).Database(data)
  }
}

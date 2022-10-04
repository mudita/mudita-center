/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Database } from "sql.js"
import { Index } from "elasticlunr"
import { ElasticlunrFactory } from "App/index-storage/factories"
import { BaseIndexer } from "App/data-sync/indexes/base.indexer"
import { ThreadTable } from "App/data-sync/constants"
import {
  IndexerPresenter,
  ThreadObject,
  ThreadInput,
} from "App/data-sync/types"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"

export class ThreadIndexer extends BaseIndexer {
  constructor(
    fileSystemService: FileSystemService,
    private dataPresenter: IndexerPresenter<ThreadInput, ThreadObject[]>
  ) {
    super(fileSystemService)
  }

  async index(fileDir: string, token: string): Promise<Index<ThreadObject>> {
    const smsDb = await this.initTmpSmsDatabase(fileDir, token)
    const contactDb = await this.initTmpContactDatabase(fileDir, token)
    const object = this.dataPresenter.serializeToObject(
      this.loadTables(smsDb, contactDb)
    )
    return this.createIndex(object)
  }

  private createIndex(data: ThreadObject[]): Index<ThreadObject> {
    const index = ElasticlunrFactory.create<ThreadObject>()

    index.setRef("id")
    index.addField("contactId")
    index.addField("contactName")
    index.addField("phoneNumber")
    index.addField("lastUpdatedAt")
    index.addField("messageSnippet")
    index.addField("unread")
    index.addField("messageType")

    data.forEach((item) => {
      index.addDoc(item)
    })

    return index
  }

  private loadTables(smsDb: Database, contactDb: Database): ThreadInput {
    return {
      [ThreadTable.Threads]: smsDb.exec(
        `SELECT * FROM ${ThreadTable.Threads};`
      )[0] as unknown as ThreadInput["threads"],
      [ThreadTable.Numbers]: contactDb.exec(
        `SELECT * FROM ${ThreadTable.Numbers};`
      )[0] as unknown as ThreadInput["contact_number"],
      [ThreadTable.Names]: contactDb.exec(
        `SELECT * FROM ${ThreadTable.Names};`
      )[0] as unknown as ThreadInput["contact_name"],
      [ThreadTable.Sms]: smsDb.exec(
        `SELECT * FROM ${ThreadTable.Sms};`
      )[0] as unknown as ThreadInput["sms"],
    }
  }

  private async initTmpSmsDatabase(
    fileDir: string,
    token: string
  ): Promise<Database> {
    const data = await this.getData(path.join(fileDir, "sms.db"), token)
    return new (await this.sql).Database(data)
  }

  private async initTmpContactDatabase(
    fileDir: string,
    token: string
  ): Promise<Database> {
    const data = await this.getData(path.join(fileDir, "contacts.db"), token)
    return new (await this.sql).Database(data)
  }
}

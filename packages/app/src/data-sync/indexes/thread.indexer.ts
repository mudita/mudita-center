/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Database } from "sql.js"
import elasticlunr, { Index } from "elasticlunr"
import { BaseIndexer } from "App/data-sync/indexes/base.indexer"
import { ThreadTable } from "App/data-sync/constants"
import {
  IndexerPresenter,
  ThreadObject,
  ThreadInput,
} from "App/data-sync/types"

export class ThreadIndexer extends BaseIndexer {
  constructor(
    private dataPresenter: IndexerPresenter<ThreadInput, ThreadObject[]>
  ) {
    super()
  }

  async index(fileDir: string): Promise<Index<ThreadObject>> {
    const smsDb = await this.initTmpSmsDatabase(fileDir)
    const contactDb = await this.initTmpContactDatabase(fileDir)
    const object = this.dataPresenter.serializeToObject(
      this.loadTables(smsDb, contactDb)
    )
    return this.createIndex(object)
  }

  private createIndex(data: ThreadObject[]): Index<ThreadObject> {
    const index = elasticlunr<ThreadObject>()

    index.setRef("id")
    index.addField("phoneNumber")
    index.addField("lastUpdatedAt")
    index.addField("messageSnippet")
    index.addField("unread")

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
    }
  }

  private async initTmpSmsDatabase(fileDir: string): Promise<Database> {
    const data = await this.getData(path.join(fileDir, "sms.db"))
    return new (await this.sql).Database(data)
  }

  private async initTmpContactDatabase(fileDir: string): Promise<Database> {
    const data = await this.getData(path.join(fileDir, "contacts.db"))
    return new (await this.sql).Database(data)
  }
}

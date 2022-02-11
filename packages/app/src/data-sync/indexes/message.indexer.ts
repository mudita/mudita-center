/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Database } from "sql.js"
import elasticlunr, { Index, SerialisedIndexData } from "elasticlunr"
import { BaseIndexer } from "App/data-sync/indexes/base.indexer"
import { MessageTable } from "App/data-sync/constants"
import {
  IndexerPresenter,
  MessageObject,
  MessageInput,
} from "App/data-sync/types"
import { SyncFileSystemService } from "App/data-sync/services/sync-file-system.service"

export class MessageIndexer extends BaseIndexer {
  constructor(
    syncFileSystemService: SyncFileSystemService,
    private dataPresenter: IndexerPresenter<MessageInput, MessageObject[]>
  ) {
    super(syncFileSystemService)
  }

  async index(fileDir: string): Promise<SerialisedIndexData<MessageObject>> {
    const smsDb = await this.initTmpSmsDatabase(fileDir)
    const contactDb = await this.initTmpContactDatabase(fileDir)
    const object = this.dataPresenter.serializeToObject(
      this.loadTables(smsDb, contactDb)
    )
    return this.createIndex(object).toJSON()
  }

  private createIndex(data: MessageObject[]): Index<MessageObject> {
    const index = elasticlunr<MessageObject>()

    index.setRef("id")
    index.addField("content")
    index.addField("date")
    index.addField("messageType")
    index.addField("phoneNumber")
    index.addField("threadId")

    data.forEach((item) => {
      index.addDoc(item)
    })

    return index
  }

  private loadTables(smsDb: Database, contactDb: Database): MessageInput {
    return {
      [MessageTable.Sms]: smsDb.exec(
        `SELECT * FROM ${MessageTable.Sms};`
      )[0] as unknown as MessageInput["sms"],
      [MessageTable.Threads]: smsDb.exec(
        `SELECT * FROM ${MessageTable.Threads};`
      )[0] as unknown as MessageInput["threads"],
      [MessageTable.Numbers]: contactDb.exec(
        `SELECT * FROM ${MessageTable.Numbers};`
      )[0] as unknown as MessageInput["contact_number"],
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

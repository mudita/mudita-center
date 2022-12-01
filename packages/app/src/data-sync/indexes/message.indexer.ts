/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Database } from "sql.js"
import { Index } from "elasticlunr"
import { ElasticlunrFactory } from "App/index-storage/factories"
import { BaseIndexer } from "App/data-sync/indexes/base.indexer"
import { MessageTable } from "App/data-sync/constants"
import {
  IndexerPresenter,
  MessageObject,
  MessageInput,
} from "App/data-sync/types"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"

export class MessageIndexer extends BaseIndexer {
  constructor(
    fileSystemService: FileSystemService,
    private dataPresenter: IndexerPresenter<MessageInput, MessageObject[]>
  ) {
    super(fileSystemService)
  }

  async index(fileDir: string, token: string): Promise<Index<MessageObject>> {
    const smsDb = await this.initTmpSmsDatabase(fileDir, token)
    const contactDb = await this.initTmpContactDatabase(fileDir, token)
    const object = this.dataPresenter.serializeToObject(
      this.loadTables(smsDb, contactDb)
    )
    return this.createIndex(object)
  }

  private createIndex(data: MessageObject[]): Index<MessageObject> {
    const index = ElasticlunrFactory.create<MessageObject>()

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

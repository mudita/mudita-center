/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Database } from "sql.js"
import { Index } from "elasticlunr"
import { ElasticlunrFactory } from "Core/index-storage/factories"
import { BaseIndexer } from "Core/data-sync/indexes/base.indexer"
import { NoteTable } from "Core/data-sync/constants"
import { IndexerPresenter, NoteObject, NoteInput } from "Core/data-sync/types"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"

export class NoteIndexer extends BaseIndexer {
  constructor(
    fileSystemService: FileSystemService,
    private dataPresenter: IndexerPresenter<NoteInput, NoteObject[]>
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

  private createIndex(data: NoteObject[]): Index<NoteObject> {
    const index = ElasticlunrFactory.create<NoteObject>()

    index.setRef("id")
    index.addField("content")
    index.addField("isPinned")
    index.addField("createDate")
    index.addField("updateDate")

    data.forEach((item) => {
      index.addDoc(item)
    })

    return index
  }

  private loadTables(db: Database) {
    return {
      [NoteTable.Notes]: db.exec(
        `SELECT _id, date, snippet FROM ${NoteTable.Notes};`
      )[0] as unknown as NoteInput["notes"],
    }
  }

  private async initTmpDatabase(
    fileDir: string,
    token?: string
  ): Promise<Database> {
    const data = await this.getData(path.join(fileDir, "notes.db"), token)
    return new (await this.sql).Database(data)
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Database } from "sql.js"
import { Index } from "elasticlunr"
import { ElasticlunrFactory } from "Core/index-storage/factories"
import { BaseIndexer } from "Core/data-sync/indexes/base.indexer"
import { TemplateTable } from "Core/data-sync/constants"
import {
  IndexerPresenter,
  TemplateObject,
  TemplateInput,
} from "Core/data-sync/types"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"

export class TemplateIndexer extends BaseIndexer {
  constructor(
    fileSystemService: FileSystemService,
    private dataPresenter: IndexerPresenter<TemplateInput, TemplateObject[]>
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

  private createIndex(data: TemplateObject[]): Index<TemplateObject> {
    const index = ElasticlunrFactory.create<TemplateObject>()

    index.setRef("id")
    index.addField("text")
    index.addField("lastUsedAt")
    index.addField("order")

    data.forEach((item) => {
      index.addDoc(item)
    })

    return index
  }

  private loadTables(db: Database) {
    return {
      [TemplateTable.Templates]: db.exec(
        `SELECT * FROM ${TemplateTable.Templates};`
      )[0] as unknown as TemplateInput["templates"],
    }
  }

  private async initTmpDatabase(
    fileDir: string,
    token?: string
  ): Promise<Database> {
    const data = await this.getData(path.join(fileDir, "sms.db"), token)
    return new (await this.sql).Database(data)
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Database } from "sql.js"
import { Index } from "elasticlunr"
import { ElasticlunrFactory } from "Core/index-storage/factories"
import { BaseIndexer } from "Core/data-sync/indexes/base.indexer"
import { QuotationsTable } from "Core/data-sync/constants"
import {
  IndexerPresenter,
  QuotationInput,
  QuotationObject,
} from "Core/data-sync/types"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"

export class QuotationsIndexer extends BaseIndexer {
  constructor(
    fileSystemService: FileSystemService,
    private dataPresenter: IndexerPresenter<QuotationInput, QuotationObject[]>
  ) {
    super(fileSystemService)
  }

  async index(
    fileDir: string,
    token?: string
  ): Promise<Index<QuotationObject>> {
    const db = await this.initTmpDatabase(fileDir, token)
    const object = this.dataPresenter.serializeToObject(this.loadTables(db))
    return this.createIndex(object)
  }

  private createIndex(data: QuotationObject[]): Index<QuotationObject> {
    const index = ElasticlunrFactory.create<QuotationObject>()

    index.setRef("id")
    index.addField("quote")
    index.addField("author")

    data.forEach((item) => {
      index.addDoc(item)
    })

    return index
  }

  private loadTables(db: Database): QuotationInput {
    console.log(db, "QuotationsIndexer.loadTables")
    return {
      [QuotationsTable.Custom]: db.exec(
        `SELECT * FROM ${QuotationsTable.Custom};`
      )[0] as unknown as QuotationInput["custom_quote_table"],
    }
  }

  private async initTmpDatabase(
    fileDir: string,
    token?: string
  ): Promise<Database> {
    const data = await this.getData(path.join(fileDir, "quotes.db"), token)
    return new (await this.sql).Database(data)
  }
}

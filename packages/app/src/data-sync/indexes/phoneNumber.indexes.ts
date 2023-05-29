/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Database } from "sql.js"
import { Index } from "elasticlunr"
import { ElasticlunrFactory } from "App/index-storage/factories"
import { BaseIndexer } from "App/data-sync/indexes/base.indexer"
import { PhoneNumberTable } from "App/data-sync/constants"
import {
  IndexerPresenter,
  PhoneNumberInput,
  PhoneNumberObject,
} from "App/data-sync/types"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { ThreadTable } from "App/data-sync/constants"

export class PhoneNumberIndexer extends BaseIndexer {
  constructor(
    fileSystemService: FileSystemService,
    private dataPresenter: IndexerPresenter<
      PhoneNumberInput,
      PhoneNumberObject[]
    >
  ) {
    super(fileSystemService)
  }

  async index(
    fileDir: string,
    token: string
  ): Promise<Index<PhoneNumberObject>> {
    const contactDb = await this.initTmpContactDatabase(fileDir, token)

    const object = this.dataPresenter.serializeToObject(
      this.loadTables(contactDb)
    )

    return this.createIndex(object)
  }

  private createIndex(data: PhoneNumberObject[]): Index<PhoneNumberObject> {
    const index = ElasticlunrFactory.create<PhoneNumberObject>()

    index.setRef("id")
    index.addField("number")

    data.forEach((item) => {
      index.addDoc(item)
    })

    return index
  }

  private loadTables(contactDb: Database): PhoneNumberInput {
    return {
      [PhoneNumberTable.Numbers]: contactDb.exec(
        `SELECT * FROM ${ThreadTable.Numbers};`
      )[0] as unknown as PhoneNumberInput["numbers"],
    }
  }

  private async initTmpContactDatabase(
    fileDir: string,
    token: string
  ): Promise<Database> {
    const data = await this.getData(path.join(fileDir, "contacts.db"), token)
    return new (await this.sql).Database(data)
  }
}

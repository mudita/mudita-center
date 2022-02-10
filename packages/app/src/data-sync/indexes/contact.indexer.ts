/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Database } from "sql.js"
import elasticlunr, { Index } from "elasticlunr"
import { BaseIndexer } from "App/data-sync/indexes/base.indexer"
import { ContactTable } from "App/data-sync/constants"
import {
  IndexerPresenter,
  ContactObject,
  ContactInput,
} from "App/data-sync/types"
import { SyncFileSystemService } from "App/data-sync/services/sync-file-system.service"

export class ContactIndexer extends BaseIndexer {
  constructor(
    syncFileSystemService: SyncFileSystemService,
    private dataPresenter: IndexerPresenter<ContactInput, ContactObject[]>
  ) {
    super(syncFileSystemService)
  }

  async index(fileDir: string): Promise<Index<ContactObject>> {
    const db = await this.initTmpDatabase(fileDir)
    try {
      const object = this.dataPresenter.serializeToObject(this.loadTables(db))
      return this.createIndex(object)
    } catch (e) {
      return this.createIndex([])
    }
  }

  private createIndex(data: ContactObject[]): Index<ContactObject> {
    const index = elasticlunr<ContactObject>()

    index.setRef("id")
    index.addField("firstName")
    index.addField("lastName")
    index.addField("primaryPhoneNumber")
    index.addField("secondaryPhoneNumber")
    index.addField("firstAddressLine")
    index.addField("secondAddressLine")
    index.addField("note")
    index.addField("email")

    data.forEach((item) => {
      index.addDoc(item)
    })

    return index
  }

  private loadTables(db: Database): ContactInput {
    return {
      [ContactTable.Contacts]: db.exec(
        `SELECT * FROM ${ContactTable.Contacts};`
      )[0] as unknown as ContactInput["contacts"],
      [ContactTable.Names]: db.exec(
        `SELECT * FROM ${ContactTable.Names};`
      )[0] as unknown as ContactInput["contact_name"],
      [ContactTable.Numbers]: db.exec(
        `SELECT * FROM ${ContactTable.Numbers};`
      )[0] as unknown as ContactInput["contact_number"],
      [ContactTable.Addresses]: db.exec(
        `SELECT * FROM ${ContactTable.Addresses};`
      )[0] as unknown as ContactInput["contact_address"],
    }
  }

  private async initTmpDatabase(fileDir: string): Promise<Database> {
    const data = await this.getData(path.join(fileDir, "contacts.db"))
    return new (await this.sql).Database(data)
  }
}

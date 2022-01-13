/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Database } from "sql.js"
import elasticlunr, { Index } from "elasticlunr"
import { BaseIndexer } from "App/data-sync/indexes/base.indexer"
import { ContactTable } from "App/data-sync/constants"
import {
  IndexerPresenter,
  ContactObject,
  ContactInput,
} from "App/data-sync/types"

export class ContactIndexer extends BaseIndexer {
  constructor(
    private dataPresenter: IndexerPresenter<ContactInput, ContactObject[]>
  ) {
    super()
  }

  async index(): Promise<Index<ContactObject>> {
    const db = await this.initTmpDatabase()
    const object = this.dataPresenter.serializeToObject(this.loadTables(db))
    return this.createIndex(object)
  }

  createIndex(data: ContactObject[]): Index<ContactObject> {
    const index = elasticlunr<ContactObject>()

    index.setRef("id")
    index.addField("firstName")
    index.addField("firstName")
    index.addField("numbers")
    index.addField("note")
    index.addField("email")

    data.forEach((item) => {
      index.addDoc(item)
    })

    return index
  }

  loadTables(db: Database): ContactInput {
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

  async initTmpDatabase(): Promise<Database> {
    const data = await this.getData("contacts.db")
    return new (await this.sql).Database(data)
  }
}

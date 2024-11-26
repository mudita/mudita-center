/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Database } from "sql.js"
import { Index } from "elasticlunr"
import { ElasticlunrFactory } from "Core/index-storage/factories"
import { BaseIndexer } from "Core/data-sync/indexes/base.indexer"
import { EventTable } from "Core/data-sync/constants"
import { IndexerPresenter, AlarmObject, EventInput } from "Core/data-sync/types"
import { FileSystemService } from "Core/file-system/services/file-system.service.refactored"

export class AlarmIndexer extends BaseIndexer {
  constructor(
    fileSystemService: FileSystemService,
    private dataPresenter: IndexerPresenter<EventInput, AlarmObject[]>
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

  private createIndex(data: AlarmObject[]): Index<AlarmObject> {
    const index = ElasticlunrFactory.create<AlarmObject>()

    index.setRef("id")
    index.addField("repeatDays")
    index.addField("isEnabled")
    index.addField("hour")
    index.addField("minute")
    index.addField("snoozeTime")

    data.forEach((item) => {
      index.addDoc(item)
    })

    return index
  }

  private loadTables(db: Database) {
    return {
      [EventTable.Alarms]: db.exec(
        `SELECT _id, hour, minute, music_tone, enabled, snooze_duration, rrule FROM ${EventTable.Alarms};`
      )[0] as unknown as EventInput["alarms"],
    }
  }

  private async initTmpDatabase(
    fileDir: string,
    token?: string
  ): Promise<Database> {
    const data = await this.getData(path.join(fileDir, "events.db"), token)
    return new (await this.sql).Database(data)
  }
}

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { IndexStorage } from "Core/index-storage/types"
import { DataSyncService } from "Core/data-sync/services/data-sync.service"
import { DataIndex, IpcDataSyncEvent } from "Core/data-sync/constants"
import { GetIndex, InitializeOptions } from "Core/data-sync/types"

export class DataSyncController {
  constructor(
    private index: IndexStorage,
    private dataSyncService: DataSyncService
  ) {}

  @IpcEvent(IpcDataSyncEvent.GetIndex)
  public getIndex<Name extends DataIndex>(indexName: Name): GetIndex<Name> {
    const index = this.index.get(indexName)

    if (index === undefined) {
      return undefined
    } else {
      return index.toJSON()
    }
  }

  @IpcEvent(IpcDataSyncEvent.IndexAll)
  public indexAll(options: InitializeOptions): Promise<boolean> {
    return this.dataSyncService.indexAll(options)
  }
}

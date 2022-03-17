/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { IndexStorage } from "App/index-storage/types"
import { DataSyncService } from "App/data-sync/services/data-sync.service"
import {
  ControllerPrefix,
  IpcDataSyncEvent,
  DataIndex,
} from "App/data-sync/constants"
import { SerialisedIndexData } from "elasticlunr"

const isSerialisedIndexData = (index: any): index is SerialisedIndexData<any> => {
  return index.toJSON === undefined
}

@Controller(ControllerPrefix)
export class DataSyncController {
  constructor(
    private index: IndexStorage,
    private dataSyncService: DataSyncService
  ) {}

  @IpcEvent(IpcDataSyncEvent.GetIndex)
  public getIndex(indexName: DataIndex): SerialisedIndexData<any> | undefined {
    const index = this.index.get(indexName)

    if(index === undefined){
      return undefined
    } else if (isSerialisedIndexData(index)) {
      return index
    } else {
      return index.toJSON()
    }
  }

  @IpcEvent(IpcDataSyncEvent.IndexAll)
  public indexAll(): Promise<boolean> {
    return this.dataSyncService.indexAll()
  }
}

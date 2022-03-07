/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { IndexStorage } from "App/index-storage/types"
import {
  ControllerPrefix,
  IpcDataSyncEvent,
  DataIndex,
} from "App/data-sync/constants"

@Controller(ControllerPrefix)
export class DataSyncController {
  constructor(private index: IndexStorage) {}

  @IpcEvent(IpcDataSyncEvent.GetIndex)
  public getIndex(indexName: DataIndex) {
    return this.index.get(indexName)
  }
}

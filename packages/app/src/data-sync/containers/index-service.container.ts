/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IndexService, DataSyncClass } from "App/data-sync/services"
import { IndexClass } from "App/data-sync/services/index-class.interface"

let indexService: IndexClass

export const createIndexService = (dataSyncService: DataSyncClass) => {
  if (!indexService) {
    indexService = new IndexService(dataSyncService)
  }

  return indexService
}

export const getIndexService = (): IndexClass | undefined => indexService

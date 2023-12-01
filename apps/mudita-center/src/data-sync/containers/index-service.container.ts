/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IndexService, DataSyncClass } from "App/data-sync/services"
import { IndexClass } from "App/data-sync/services/index-class.interface"

let indexService: IndexClass

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createIndexService = (dataSyncService: DataSyncClass) => {
  if (!indexService) {
    indexService = new IndexService(dataSyncService)
  }

  return indexService
}

export const getIndexService = (): IndexClass | undefined => indexService

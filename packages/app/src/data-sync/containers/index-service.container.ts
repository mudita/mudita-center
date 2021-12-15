/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IndexService, DataSync } from "App/data-sync/services"

let indexService: IndexService

export const createIndexService = (dataSyncService: DataSync) => {
  if (!indexService) {
    indexService = new IndexService(dataSyncService)
  }

  return indexService
}

export const getIndexService = () => indexService

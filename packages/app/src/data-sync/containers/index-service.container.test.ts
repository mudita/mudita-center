/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataSyncClass } from "App/data-sync/services"
import {
  createIndexService,
  getIndexService,
} from "App/data-sync/containers/index-service.container"

const dataSyncService: DataSyncClass = {
  indexesMap: new Map(),
  indexAll: jest.fn(),
  initialize: jest.fn(),
}

describe("`createIndexService()` ", () => {
  test("it should return the same instance every time", () => {
    const indexService = createIndexService(dataSyncService)
    const indexService2 = createIndexService(dataSyncService)

    expect(indexService).toBe(indexService2)
  })
})

describe("`getIndexService()` ", () => {
  test("it should return the same instance every time", () => {
    const indexService = getIndexService()
    const indexService2 = getIndexService()

    expect(indexService).toBe(indexService2)
  })
})

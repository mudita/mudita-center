/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataIndex, DataSyncClass, IndexService } from "App/data-sync"

const dataSyncService: DataSyncClass = {
  indexesMap: new Map(),
  indexAll: jest.fn(),
  initialize: jest.fn(),
}

describe("`IndexService`", () => {
  test("`initialize` no return value", () => {
    const indexService = new IndexService(dataSyncService)

    expect(indexService.initialize()).toBeUndefined()
  })

  test("`indexAll` no return value", async () => {
    const indexService = new IndexService(dataSyncService)

    expect(await indexService.indexAll()).toBeUndefined()
  })

  test("`getIndex` return undefined if index isn't exist", async () => {
    const indexService = new IndexService(dataSyncService)
    const contactIndex = await indexService.getIndex(DataIndex.Contact)

    expect(contactIndex).toBeUndefined()
  })
})

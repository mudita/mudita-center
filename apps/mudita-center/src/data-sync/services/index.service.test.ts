/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataSyncClass } from "App/data-sync/services/data-sync-class.interface"
import { IndexService } from "App/data-sync/services/index.service"
import { DataIndex } from "App/data-sync/constants"
import { InitializeOptions } from "App/data-sync/types"

const dataSyncService: DataSyncClass = {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  indexesMap: new Map(),
  indexAll: jest.fn(),
  initialize: jest.fn(),
}

const token = "Nr8uiSV7KmWxX3WOFqZPF7uB+Zx8qaPa"
const options: InitializeOptions = {
  token,
  serialNumber: "1UB13213MN14K1",
}

describe("`IndexService`", () => {
  test("`initialize` no return value", () => {
    const indexService = new IndexService(dataSyncService)

    expect(indexService.initialize(options)).toBeUndefined()
  })

  test("`indexAll` no return value", async () => {
    const indexService = new IndexService(dataSyncService)

    expect(await indexService.indexAll()).toBeUndefined()
  })

  test("`getIndex` return undefined if index isn't exist", async () => {
    const indexService = new IndexService(dataSyncService)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const contactIndex = await indexService.getIndex(DataIndex.Contact)

    expect(contactIndex).toBeUndefined()
  })
})

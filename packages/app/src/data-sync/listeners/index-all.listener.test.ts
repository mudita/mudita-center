/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcDataSyncEvent, registerIndexAllListener } from "App/data-sync"
import { IndexClass } from "App/data-sync/services/index-class.interface"

const indexService: IndexClass = {
  initialize: jest.fn(),
  indexAll: jest.fn(),
  getIndex: jest.fn(),
}

jest.mock("App/data-sync/containers/index-service.container", () => ({
  getIndexService: () => indexService
}))

describe("`registerIndexAllListener`", () => {
  test("listener execute `indexAll` method properly", async () => {
    registerIndexAllListener()
    void (ipcMain as any)._flush(
      IpcDataSyncEvent.IndexAll
    )
    expect(indexService.indexAll).toHaveBeenCalled()
  })
})

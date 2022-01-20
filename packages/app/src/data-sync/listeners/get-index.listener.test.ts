/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcDataSyncEvent, registerGetIndexListener } from "App/data-sync"
import { IndexClass } from "App/data-sync/services/index-class.interface"

const indexService: IndexClass = {
  initialize: jest.fn(),
  indexAll: jest.fn(),
  getIndex: jest.fn(),
}

jest.mock("App/data-sync/containers/index-service.container", () => ({
  getIndexService: () => indexService
}))

describe("`registerGetIndexListener`", () => {
  test("listener execute `getIndex` method properly", async () => {
    registerGetIndexListener()
    void (ipcMain as any)._flush(
      IpcDataSyncEvent.GetIndex
    )
    expect(indexService.getIndex).toHaveBeenCalled()
  })
})

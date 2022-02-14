/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcDataSyncEvent } from "App/data-sync/constants"
import { indexAllRequest } from "App/data-sync/requests/index-all.request"

describe("`indexAllRequest`", () => {
  test("return properly value", async () => {
    ;(ipcRenderer as any).__rendererCalls = {
      [IpcDataSyncEvent.IndexAll]: undefined,
    }
    const response = await indexAllRequest()
    expect(response).toBeUndefined()
  })
})

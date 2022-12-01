/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcDataSyncRequest } from "App/data-sync/constants"
import { indexAllRequest } from "App/data-sync/requests/index-all.request"

describe("`indexAllRequest`", () => {
  test("return properly value", async () => {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    ;(ipcRenderer as any).__rendererCalls = {
      [IpcDataSyncRequest.IndexAll]: undefined,
    }
    const response = await indexAllRequest()
    expect(response).toBeUndefined()
  })
})

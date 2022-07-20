/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getFakeAdapters from "App/__deprecated__/tests/get-fake-adapters"
import registerChangeSimCardRequest from "App/__deprecated__/backend/requests/change-sim/change-sim.request"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"

test("returns change sim info", () => {
  registerChangeSimCardRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.ChangeSim)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
})

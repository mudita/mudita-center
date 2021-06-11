/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerUnlockDeviceRequest from "./unlock-device.request"

test("unlock device returns properly value", async () => {
  registerUnlockDeviceRequest(getFakeAdapters())
  const [pendingResponse] = (ipcMain as any)._flush(IpcRequest.UnlockDevice, {
    code: [3, 3, 3, 3],
  })
  const result = await pendingResponse
  expect(result).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
})

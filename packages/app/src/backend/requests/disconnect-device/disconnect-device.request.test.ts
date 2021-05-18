/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerDisconnectDeviceRequest from "./disconnect-device.request"

test("returns disconnected info", async() => {
  registerDisconnectDeviceRequest(getFakeAdapters())
  const [pendingResponse] = (ipcMain as any)._flush(IpcRequest.DisconnectDevice)
  const result = await pendingResponse
  expect(result).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
})

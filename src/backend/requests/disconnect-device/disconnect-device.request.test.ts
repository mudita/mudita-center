/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerDisconnectDeviceRequest from "./disconnect-device.request"

test("returns disconnected info", () => {
  registerDisconnectDeviceRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.DisconnectDevice)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
})

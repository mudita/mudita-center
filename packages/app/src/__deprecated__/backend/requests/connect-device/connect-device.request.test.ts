/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getFakeAdapters from "App/__deprecated__/tests/get-fake-adapters"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerConnectDeviceRequest from "./connect-device.request"
import { RequestResponse } from "App/core/types/request-response.interface"

test("returns disconnected info", (done) => {
  registerConnectDeviceRequest(getFakeAdapters())
  const [promise] = (ipcMain as any)._flush(IpcRequest.ConnectDevice)
  promise.then((result: RequestResponse) => {
    expect(result).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
    done()
  })
})

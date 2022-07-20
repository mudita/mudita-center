/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import getFakeAdapters from "App/__deprecated__/tests/get-fake-adapters"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import registerGetRestoreDeviceStatusRequest from "App/__deprecated__/backend/requests/get-restore-device-status/get-restore-device-status.request"

test("`GetRestoreDeviceStatus` returns properly value", async () => {
  registerGetRestoreDeviceStatusRequest(getFakeAdapters())
  const [pendingResponse] = (ipcMain as any)._flush(
    IpcRequest.GetRestoreDeviceStatus
  )
  const result = await pendingResponse
  expect(result).toMatchInlineSnapshot(`
    Object {
      "data": Object {
        "id": "<YYYY-MM-DD>T<HHMMSS>Z",
        "state": "finished",
      },
      "status": "ok",
    }
  `)
})

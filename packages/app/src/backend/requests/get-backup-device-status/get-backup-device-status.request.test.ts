/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerGetBackupDeviceStatusRequest from "Backend/requests/get-backup-device-status/get-backup-device-status.request"

test("`GetBackupDeviceStatus` returns properly value", async () => {
  registerGetBackupDeviceStatusRequest(getFakeAdapters())
  const [pendingResponse] = (ipcMain as any)._flush(
    IpcRequest.GetBackupDeviceStatus
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

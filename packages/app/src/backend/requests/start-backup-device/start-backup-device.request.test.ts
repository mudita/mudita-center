/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerStartBackupDeviceRequest from "Backend/requests/start-backup-device/start-backup-device.request"

test("`StartBackupDevice` returns properly value", async () => {
  registerStartBackupDeviceRequest(getFakeAdapters())
  const [pendingResponse] = (ipcMain as any)._flush(
    IpcRequest.StartBackupDevice
  )
  const result = await pendingResponse
  expect(result).toMatchInlineSnapshot(`
    Object {
      "data": Object {
        "id": "<YYYY-MM-DD>T<HHMMSS>Z",
      },
      "status": "ok",
    }
  `)
})

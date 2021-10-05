/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerDownloadDeviceFileRequest from "Backend/requests/download-device-file/download-device-file.request"

test("`DownloadDeviceFileRequest` returns properly value", async () => {
  registerDownloadDeviceFileRequest(getFakeAdapters())
  const [pendingResponse] = (ipcMain as any)._flush(
    IpcRequest.DownloadDeviceFile
  )
  const result = await pendingResponse
  expect(result).toMatchInlineSnapshot(`
    Object {
      "data": Object {
        "data": "backup data",
        "name": "<YYYY-MM-DD>T<HHMMSS>Z",
      },
      "status": "ok",
    }
  `)
})

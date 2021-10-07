/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerUploadDeviceFileRequest from "Backend/requests/upload-device-file/upload-device-file.request"

test("`UploadDeviceFileRequest` returns properly value", async () => {
  registerUploadDeviceFileRequest(getFakeAdapters())
  const [pendingResponse] = (ipcMain as any)._flush(IpcRequest.UploadDeviceFile)
  const result = await pendingResponse
  expect(result).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
})

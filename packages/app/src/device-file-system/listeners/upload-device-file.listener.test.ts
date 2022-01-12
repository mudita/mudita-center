/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcDeviceFileSystem } from "App/device-file-system"
import registerUploadDeviceFileRequest from "App/device-file-system/listeners/upload-device-file.listener"

test("`UploadDeviceFileRequest` returns properly value", async () => {
  registerUploadDeviceFileRequest(getFakeAdapters())
  const [pendingResponse] = (ipcMain as any)._flush(
    IpcDeviceFileSystem.UploadDeviceFile,
    { data: new Uint8Array([1]), targetPath: "" }
  )
  const result = await pendingResponse
  expect(result).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
})

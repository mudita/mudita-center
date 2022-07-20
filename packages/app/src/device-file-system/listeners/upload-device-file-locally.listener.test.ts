/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import getFakeAdapters from "App/__deprecated__/tests/get-fake-adapters"
import { IpcDeviceFileSystem } from "App/device-file-system"
import registerUploadDeviceFileLocallyRequest from "App/device-file-system/listeners/upload-device-file-locally.listener"

test("`UploadDeviceFileLocally` returns properly value", async () => {
  registerUploadDeviceFileLocallyRequest(getFakeAdapters())
  const [pendingResponse] = (ipcMain as any)._flush(IpcDeviceFileSystem.UploadDeviceFileLocally)
  const result = await pendingResponse
  expect(result).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
})

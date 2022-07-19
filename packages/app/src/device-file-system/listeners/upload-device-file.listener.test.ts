/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import getFakeAdapters from "App/__deprecated__/tests/get-fake-adapters"
import { IpcDeviceFileSystem } from "App/device-file-system"
import registerUploadDeviceFileRequest from "App/device-file-system/listeners/upload-device-file.listener"

test("`UploadDeviceFileRequest` returns properly value", async () => {
  registerUploadDeviceFileRequest(getFakeAdapters())
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  const [pendingResponse] = (ipcMain as any)._flush(
    IpcDeviceFileSystem.UploadDeviceFile,
    { data: new Uint8Array([1]), targetPath: "" }
  )
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result = await pendingResponse
  expect(result).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
})

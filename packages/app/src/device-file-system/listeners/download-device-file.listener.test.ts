/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcDeviceFileSystem } from "App/device-file-system"
import registerDownloadDeviceFilesRequest from "App/device-file-system/listeners/download-device-file.listener"

test("`DownloadDeviceFileRequest` returns properly value", async () => {
  registerDownloadDeviceFilesRequest(getFakeAdapters())
  const [pendingResponse] = (ipcMain as any)._flush(
    IpcDeviceFileSystem.DownloadDeviceFiles
  )
  const result = await pendingResponse
  expect(result).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "data": Object {
            "data": Array [
              98,
              97,
              99,
              107,
              117,
              112,
              32,
              100,
              97,
              116,
              97,
            ],
            "type": "Buffer",
          },
          "name": "<YYYY-MM-DD>T<HHMMSS>Z",
        },
      ],
      "status": "ok",
    }
  `)
})

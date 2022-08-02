/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import getFakeAdapters from "App/__deprecated__/tests/get-fake-adapters"
import { IpcDeviceFileSystem } from "App/device-file-system"
import registerDownloadDeviceFilesRequest from "App/device-file-system/listeners/download-device-file.listener"

test("`DownloadDeviceFileRequest` returns properly value", async () => {
  registerDownloadDeviceFilesRequest(getFakeAdapters())
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  const [pendingResponse] = (ipcMain as any)._flush(
    IpcDeviceFileSystem.DownloadDeviceFiles
  )
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

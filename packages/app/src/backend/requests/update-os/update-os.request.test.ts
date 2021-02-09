/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerUpdateOsRequest from "Backend/requests/update-os/update-os.request"
import DeviceResponse from "Backend/adapters/device-response.interface"

jest.mock("electron", () => ({
  app: {
    getPath: () => "/mocked/path",
  },
}))

jest.mock("fs-extra", () => ({
  readJSON: () => ({
    pureOsDownloadLocation: "pure/os",
  }),
}))

test("returns update os info", (done) => {
  registerUpdateOsRequest(getFakeAdapters())
  const [promise] = (ipcMain as any)._flush(IpcRequest.UpdateOs, {
    fileName: "",
    progressChannel: "",
  })
  promise.then((result: DeviceResponse) => {
    expect(result).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
    done()
  })
})

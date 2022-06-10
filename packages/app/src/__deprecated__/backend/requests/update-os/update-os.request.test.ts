/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getFakeAdapters from "App/__deprecated__/tests/get-fake-adapters"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerUpdateOsRequest from "App/__deprecated__/backend/requests/update-os/update-os.request"
import { RequestResponse } from "App/core/types/request-response.interface"

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
  promise.then((result: RequestResponse) => {
    expect(result).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
    done()
  })
})

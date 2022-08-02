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
    osDownloadLocation: "pure/os",
  }),
}))

test("returns update os info", (done) => {
  registerUpdateOsRequest(getFakeAdapters())
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  const [promise] = (ipcMain as any)._flush(IpcRequest.UpdateOs, {
    fileName: "",
    progressChannel: "",
  })
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  promise.then((result: RequestResponse) => {
    expect(result).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
    done()
  })
})

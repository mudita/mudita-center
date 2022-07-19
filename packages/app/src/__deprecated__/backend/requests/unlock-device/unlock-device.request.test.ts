/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getFakeAdapters from "App/__deprecated__/tests/get-fake-adapters"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerUnlockDeviceRequest from "./unlock-device.request"

test("unlock device returns properly value", async () => {
  registerUnlockDeviceRequest(getFakeAdapters())
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  const [pendingResponse] = (ipcMain as any)._flush(IpcRequest.UnlockDevice, {
    code: [3, 3, 3, 3],
  })
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result = await pendingResponse
  expect(result).toMatchInlineSnapshot(`
    Object {
      "status": "ok",
    }
  `)
})

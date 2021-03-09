/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import getFakeAdapters from "App/tests/get-fake-adapters"
import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerGetThreadsRequest from "Backend/requests/messages/get-threads.request"
import { messagesSeed } from "App/seeds/messages"

test("return mapped threads from pure to Thread model", async () => {
  registerGetThreadsRequest(getFakeAdapters())

  const [pendingResponse] = await (ipcMain as any)._flush(IpcRequest.GetThreads)

  const { data = [] } = await pendingResponse

  expect(data).toMatchObject(messagesSeed.threads)
})

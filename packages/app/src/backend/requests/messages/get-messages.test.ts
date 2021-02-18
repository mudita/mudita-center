/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import getFakeAdapters from "App/tests/get-fake-adapters"
import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerGetMessagesRequest from "Backend/requests/messages/get-messages.request"
import { messagesData } from "App/seeds/messages"

test("return mapped messages from pure to Message model", async () => {
  registerGetMessagesRequest(getFakeAdapters())

  const [pendingResponse] = await (ipcMain as any)._flush(
    IpcRequest.GetMessages
  )

  const { data = [] } = await pendingResponse
  expect(data).toMatchObject(messagesData)
})

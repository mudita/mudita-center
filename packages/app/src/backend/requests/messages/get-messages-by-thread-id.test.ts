/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import getFakeAdapters from "App/tests/get-fake-adapters"
import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerGetMessagesByThreadIdRequest from "Backend/requests/messages/get-messages-by-thread-id.request"
import { messagesData } from "App/seeds/messages"

const threadId = messagesData[0].threadId
const messages = messagesData.filter((message) => message.threadId === threadId)

test("return mapped messages from pure to Message model", async () => {
  registerGetMessagesByThreadIdRequest(getFakeAdapters())

  const [pendingResponse] = await (ipcMain as any)._flush(
    IpcRequest.GetMessagesByThreadId,
    {
      threadId,
      nextPage: {
        limit: 15,
        offset: 0,
      },
    }
  )

  const { data } = await pendingResponse
  expect(data?.data).toStrictEqual(messages)
})

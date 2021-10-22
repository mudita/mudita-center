/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerAddMessageRequest from "Backend/requests/messages/add-message.request"
import {
  Message,
  MessageType,
  NewMessage,
} from "App/messages/reducers/messages.interface"
import DeviceService from "Backend/device-service"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import PureDeviceManager, {
  Message as PureMessage,
  MessageType as PureMessageType,
} from "@mudita/pure"
import createPurePhoneMessagesAdapter from "Backend/adapters/pure-phone-messages/pure-phone-messages.adapter"
import Adapters from "Backend/adapters/adapters.interface"

const newMessage: NewMessage = {
  content:
    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  phoneNumber: "+48500600700",
}

const pureMessage: PureMessage = {
  contactID: 2,
  messageBody: newMessage.content,
  messageID: 6,
  messageType: PureMessageType.OUTBOX,
  createdAt: 1547465101,
  threadID: 1,
  number: newMessage.phoneNumber,
}

const message: Message = {
  id: "6",
  date: new Date(pureMessage.createdAt * 1000),
  content: newMessage.content,
  contactId: "2",
  threadId: "1",
  phoneNumber: newMessage.phoneNumber,
  messageType: MessageType.OUTBOX,
}

jest.mock("Backend/device-service")

test("adds message works properly", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => ({
        status: DeviceResponseStatus.Ok,
        data: pureMessage,
      }),
    }
  })
  registerAddMessageRequest({
    pureMessages: createPurePhoneMessagesAdapter(
      new DeviceService(PureDeviceManager, ipcMain)
    ),
  } as unknown as Adapters)

  const [pendingResponse] = await (ipcMain as any)._flush(
    IpcRequest.AddMessage,
    newMessage
  )
  const { data } = await pendingResponse

  expect(data).toStrictEqual(message)
})

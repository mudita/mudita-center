/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { MessagesEvent } from "App/messages/constants"
import { testError } from "Renderer/store/constants"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { loadMessagesById } from "App/messages/actions/load-messages-by-id.action"
import getMessagesByThreadId from "Renderer/requests/get-messages-by-thread-id.request"
import {
  GetMessagesBody,
  GetMessagesByThreadIdResponse,
} from "Backend/adapters/pure-phone-messages/pure-phone-messages.class"
import { LoadMessagesByIdError } from "App/messages/errors"
import { Message, MessageType } from "App/messages/reducers"

jest.mock("Renderer/requests/get-messages-by-thread-id.request")

const messages: Message[] = [
  {
    id: "6",
    date: new Date(),
    content: "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
    contactId: "2",
    threadId: "1",
    phoneNumber: "+48500600700",
    messageType: MessageType.OUTBOX,
  },
]

const successDeviceResponse: DeviceResponse<GetMessagesByThreadIdResponse> = {
  status: DeviceResponseStatus.Ok,
  data: {
    data: messages
  },
}

const errorDeviceResponse: DeviceResponse = {
  status: DeviceResponseStatus.Error,
}

const getMessagesBody: GetMessagesBody = {
  threadId: "1",
  nextPage: {
    limit: 5,
    offset: 0,
  },
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `loadMessagesById` ", () => {
  describe("when `getMessagesByThreadId` request return success", () => {
    test("fire async `loadMessagesById` call `setMessages`", async () => {
      ;(getMessagesByThreadId as jest.Mock).mockReturnValue(
        successDeviceResponse
      )
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        loadMessagesById(getMessagesBody) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        loadMessagesById.pending(requestId, getMessagesBody),
        {
          type: MessagesEvent.SetMessages,
          payload: messages,
        },
        loadMessagesById.fulfilled(undefined, requestId, getMessagesBody),
      ])

      expect(getMessagesByThreadId).toHaveBeenCalled()
    })
  })

  describe("when `getMessagesByThreadId` request return error", () => {
    test("fire async `loadMessagesById` returns `rejected` action", async () => {
      ;(getMessagesByThreadId as jest.Mock).mockReturnValue(errorDeviceResponse)
      const errorMock = new LoadMessagesByIdError("Load Messages By Id request failed")
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        loadMessagesById(getMessagesBody) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        loadMessagesById.pending(requestId, getMessagesBody),
        loadMessagesById.rejected(
          testError,
          requestId,
          getMessagesBody,
          errorMock
        ),
      ])

      expect(getMessagesByThreadId).toHaveBeenCalled()
    })
  })
})

/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { Message, MessageType } from "App/messages/reducers"
import { MessagesEvent } from "App/messages/constants"
import { testError } from "Renderer/store/constants"
import { loadMessagesById } from "App/messages/actions/load-messages-by-id.action"
import { getMessagesByThreadIdRequest } from "App/messages/requests"
import { LoadMessagesByIdError } from "App/messages/errors"
import { setMessages } from "App/messages/actions/base.action"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { GetMessagesBody, GetMessagesByThreadIdResponse } from "App/messages/services"

const messages: Message[] = [
  {
    id: "6",
    date: new Date("2021-10-19T10:42:27.431Z"),
    content:
      "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
    threadId: "1",
    phoneNumber: "+48500600700",
    messageType: MessageType.OUTBOX,
  },
]

const successDeviceResponse: RequestResponse<GetMessagesByThreadIdResponse> = {
  status: RequestResponseStatus.Ok,
  data: {
    data: messages,
  },
}

const errorDeviceResponse: RequestResponse = {
  status: RequestResponseStatus.Error,
}

const getMessagesBody: GetMessagesBody = {
  threadId: "1",
  nextPage: {
    limit: 5,
    offset: 0,
  },
}

jest.mock("App/messages/requests/get-messages-by-thread-id.request")
jest.mock("App/messages/actions/base.action", () => ({
  setMessages: jest.fn().mockReturnValue({
    type: MessagesEvent.SetMessages,
    payload: [
      {
        id: "6",
        date: new Date("2021-10-19T10:42:27.431Z"),
        content:
          "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
        threadId: "1",
        phoneNumber: "+48500600700",
        messageType: MessageType.OUTBOX,
      },
    ],
  }),
}))

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `loadMessagesById` ", () => {
  describe("when `getMessagesByThreadId` request return success", () => {
    test("fire async `loadMessagesById` call `setMessages`", async () => {
      ;(getMessagesByThreadIdRequest as jest.Mock).mockReturnValue(
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

      expect(getMessagesByThreadIdRequest).toHaveBeenCalled()
    })
  })

  describe("when `getMessagesByThreadId` request return error", () => {
    test("fire async `loadMessagesById` returns `rejected` action", async () => {
      ;(getMessagesByThreadIdRequest as jest.Mock).mockReturnValue(errorDeviceResponse)
      const errorMock = new LoadMessagesByIdError(
        "Load Messages By Id request failed"
      )
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

      expect(getMessagesByThreadIdRequest).toHaveBeenCalled()
      expect(setMessages).not.toHaveBeenCalled()
    })
  })
})

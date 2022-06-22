/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { AddNewMessageError } from "App/messages/errors"
import { createMessageRequest } from "App/messages/requests"
import { addNewMessage } from "App/messages/actions/add-new-message.action"
import { NewMessage } from "App/messages/dto"
import { MessageType } from "App/messages/constants"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { CreateMessageDataResponse } from "App/messages/services"

jest.mock("App/messages/requests/create-message.request")
const mockAddedNewMessageData: NewMessage = {
  content:
    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  phoneNumber: "+48500600700",
}
const mockAddedMessageData: CreateMessageDataResponse = {
  messageParts: [
    {
      message: {
        id: "6",
        date: new Date(),
        content: mockAddedNewMessageData.content,
        threadId: "1",
        phoneNumber: mockAddedNewMessageData.phoneNumber,
        messageType: MessageType.OUTBOX,
      },
    },
  ],
}

const successDeviceResponse: RequestResponse<CreateMessageDataResponse> = {
  status: RequestResponseStatus.Ok,
  data: mockAddedMessageData,
}

const errorDeviceResponse: RequestResponse = {
  status: RequestResponseStatus.Error,
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("async `addNewMessage` ", () => {
  describe("when `addMessage` request return success", () => {
    test("fire async `addNewMessage` call `loadThreads` and `loadMessagesById`", async () => {
      ;(createMessageRequest as jest.Mock).mockReturnValue(
        successDeviceResponse
      )
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        addNewMessage(mockAddedNewMessageData) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        addNewMessage.pending(requestId, mockAddedNewMessageData),
        addNewMessage.fulfilled(
          mockAddedMessageData,
          requestId,
          mockAddedNewMessageData
        ),
      ])

      expect(createMessageRequest).toHaveBeenCalled()
    })
  })

  describe("when `addMessage` request return error", () => {
    test("fire async `addNewMessage` returns `rejected` action", async () => {
      ;(createMessageRequest as jest.Mock).mockReturnValue(errorDeviceResponse)
      const errorMock = new AddNewMessageError("Add New Message request failed")
      const mockStore = createMockStore([thunk])()
      const {
        meta: { requestId },
      } = await mockStore.dispatch(
        addNewMessage(mockAddedNewMessageData) as unknown as AnyAction
      )

      expect(mockStore.getActions()).toEqual([
        addNewMessage.pending(requestId, mockAddedNewMessageData),
        addNewMessage.rejected(
          testError,
          requestId,
          mockAddedNewMessageData,
          errorMock
        ),
      ])

      expect(createMessageRequest).toHaveBeenCalled()
    })
  })
})

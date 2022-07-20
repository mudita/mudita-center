/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { resendMessage } from "App/messages/actions/resend-message.action"
import { MessagesError, MessageType } from "App/messages/constants"
import { resendMessageRequest } from "App/messages/requests/resend-message.request"
import { CreateMessageDataResponse } from "App/messages/services"
import { testError } from "App/__deprecated__/renderer/store/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"

jest.mock("App/messages/requests/resend-message.request")

const mockReSendedMessageData: CreateMessageDataResponse = {
  messageParts: [
    {
      message: {
        id: "6",
        date: new Date(),
        content:
          "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
        threadId: "1",
        phoneNumber: "+48500600700",
        messageType: MessageType.OUTBOX,
      },
    },
  ],
}

const successDeviceResponse: RequestResponse<CreateMessageDataResponse> = {
  status: RequestResponseStatus.Ok,
  data: mockReSendedMessageData,
}

const successDeviceResponseWithEmptyData: RequestResponse<CreateMessageDataResponse> =
  {
    status: RequestResponseStatus.Ok,
  }

const errorDeviceResponseWithMessage: RequestResponse = {
  status: RequestResponseStatus.Error,
  error: {
    message: "I'm error",
  },
}

const errorDeviceResponseWithoutMessage: RequestResponse = {
  status: RequestResponseStatus.Error,
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("when `resendMessage` request return success", () => {
  test("`resendMessage` returns thread id", async () => {
    ;(resendMessageRequest as jest.Mock).mockReturnValue(successDeviceResponse)
    const mockStore = createMockStore([thunk])()
    const {
      meta: { requestId },
    } = await mockStore.dispatch(resendMessage("6") as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      resendMessage.pending(requestId, "6"),
      resendMessage.fulfilled(mockReSendedMessageData, requestId, "6"),
    ])

    expect(resendMessageRequest).toHaveBeenCalled()
  })
})

describe("when `resend` request return error", () => {
  test("`resendMessage` returns `rejected` action if error have `message`", async () => {
    ;(resendMessageRequest as jest.Mock).mockReturnValue(
      errorDeviceResponseWithMessage
    )

    const errorMock = new AppError(
      MessagesError.ResendMessageError,
      "I'm error"
    )
    const mockStore = createMockStore([thunk])()
    const {
      meta: { requestId },
    } = await mockStore.dispatch(resendMessage("6") as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      resendMessage.pending(requestId, "6"),
      resendMessage.rejected(testError, requestId, "6", errorMock),
    ])

    expect(resendMessageRequest).toHaveBeenCalled()
  })

  test("`resendMessage` returns `rejected` with default `message` if error haven't `message`", async () => {
    ;(resendMessageRequest as jest.Mock).mockReturnValue(
      errorDeviceResponseWithoutMessage
    )

    const errorMock = new AppError(
      MessagesError.ResendMessageError,
      "Resending failed"
    )
    const mockStore = createMockStore([thunk])()
    const {
      meta: { requestId },
    } = await mockStore.dispatch(resendMessage("6") as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      resendMessage.pending(requestId, "6"),
      resendMessage.rejected(testError, requestId, "6", errorMock),
    ])

    expect(resendMessageRequest).toHaveBeenCalled()
  })

  test("`resendMessage` returns `rejected` with default `message` if data doesn't exists in response", async () => {
    ;(resendMessageRequest as jest.Mock).mockReturnValue(
      successDeviceResponseWithEmptyData
    )

    const errorMock = new AppError(
      MessagesError.ResendMessageError,
      "Resending failed"
    )
    const mockStore = createMockStore([thunk])()
    const {
      meta: { requestId },
    } = await mockStore.dispatch(resendMessage("6") as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      resendMessage.pending(requestId, "6"),
      resendMessage.rejected(testError, requestId, "6", errorMock),
    ])

    expect(resendMessageRequest).toHaveBeenCalled()
  })
})

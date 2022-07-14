/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { updateMessage } from "App/messages/actions/update-message.action"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { CreateMessageDataResponse } from "App/messages/services"
import { updateMessageRequest } from "App/messages/requests"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { Message } from "App/messages/dto"
import { MessageType, MessagesError } from "App/messages/constants"
import { AppError } from "App/core/errors"

jest.mock("App/messages/requests/update-message.request")

const message: Message = {
  id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
  date: new Date("2019-10-18T11:27:15.256Z"),
  content:
    "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
  threadId: "1",
  phoneNumber: "+48 755 853 216",
  messageType: MessageType.INBOX,
}

const successDeviceResponse: RequestResponse<CreateMessageDataResponse> = {
  status: RequestResponseStatus.Ok,
}

const errorDeviceResponse: RequestResponse = {
  status: RequestResponseStatus.Error,
  error: {
    message: "Luke, I'm your error",
  },
}

const errorMock = new AppError(
  MessagesError.UpdateMessageError,
  "Luke, I'm your error"
)

afterEach(() => {
  jest.resetAllMocks()
})

describe("`updateMessageRequest` return success response", () => {
  test("`updateMessage` returns an empty response", async () => {
    ;(updateMessageRequest as jest.Mock).mockReturnValue(successDeviceResponse)
    const mockStore = createMockStore([thunk])()
    const {
      meta: { requestId },
    } = await mockStore.dispatch(updateMessage(message) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      updateMessage.pending(requestId, message),
      updateMessage.fulfilled(undefined, requestId, message),
    ])

    expect(updateMessageRequest).toHaveBeenCalledWith(message)
  })
})

describe("`updateMessageRequest` return failed response", () => {
  test("`updateMessage` returns an error response", async () => {
    ;(updateMessageRequest as jest.Mock).mockReturnValue(errorDeviceResponse)
    const mockStore = createMockStore([thunk])()
    const {
      meta: { requestId },
    } = await mockStore.dispatch(updateMessage(message) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      updateMessage.pending(requestId, message),
      updateMessage.rejected(testError, requestId, message, errorMock),
    ])

    expect(updateMessageRequest).toHaveBeenCalledWith(message)
  })
})

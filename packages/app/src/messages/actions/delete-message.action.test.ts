/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { deleteMessageRequest } from "App/messages/requests"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { deleteMessage } from "./delete-message.action"
import { testError } from "App/__deprecated__/renderer/store/constants"
import { DeleteMessageError } from "../errors/delete-message.error"

jest.mock("App/messages/requests/delete-message.request.ts")

const messageId = "123"

const successResponse: RequestResponse<undefined> = {
  status: RequestResponseStatus.Ok,
}

const errorResponse: RequestResponse = {
  status: RequestResponseStatus.Error,
  error: {
    message: "I'm error",
  },
}

afterEach(() => {
  jest.resetAllMocks()
})

describe("when `deleteMessage` returns success", () => {
  test("message id is returned", async () => {
    ;(deleteMessageRequest as jest.Mock).mockReturnValue(successResponse)

    const mockStore = createMockStore([thunk])()
    const {
      meta: { requestId },
    } = await mockStore.dispatch(
      deleteMessage(messageId) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      deleteMessage.pending(requestId, messageId),
      deleteMessage.fulfilled(messageId, requestId, messageId),
    ])

    expect(deleteMessageRequest).toHaveBeenCalled()
  })
})

describe("when `deleteMessage` returns error", () => {
  test("exception is raised", async () => {
    ;(deleteMessageRequest as jest.Mock).mockReturnValue(errorResponse)

    const mockStore = createMockStore([thunk])()
    const errorMock = new DeleteMessageError("Delete message request failed")

    const {
      meta: { requestId },
    } = await mockStore.dispatch(
      deleteMessage(messageId) as unknown as AnyAction
    )

    expect(mockStore.getActions()).toEqual([
      deleteMessage.pending(requestId, messageId),
      deleteMessage.rejected(testError, requestId, messageId, errorMock),
    ])

    expect(deleteMessageRequest).toHaveBeenCalled()
  })
})
